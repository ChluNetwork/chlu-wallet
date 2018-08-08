import { createAction, handleActions } from 'redux-actions'
import { getChluIPFS } from 'helpers/ipfs'
import { toastr } from 'react-redux-toastr'
import CreateChluTransaction from 'chlu-wallet-support-js/lib/create_chlu_transaction';
import { getAddress } from 'helpers/wallet';

// ------------------------------------
// Constants
// ------------------------------------
const SET_PAYMENT_SUCCESS = 'payment/SET_PAYMENT_SUCCESS'
const SET_PAYMENT_ERROR = 'payment/SET_PAYMENT_ERROR'
const SET_PAYMENT_LOADING = 'payment/SET_PAYMENT_LOADING'

const initialState = {
  loading: false,
  error: null
}

// ------------------------------------
// Actions
// ------------------------------------
export const setPaymentSuccess = createAction(SET_PAYMENT_SUCCESS)
export const setPaymentError = createAction(SET_PAYMENT_ERROR)
export const setPaymentLoading = createAction(SET_PAYMENT_LOADING)

// ------------------------------------
// Thunks
// ------------------------------------

export function submitPayment (data) {
  return async (dispatch, getState) => {
    dispatch(setPaymentLoading(true))
    try {
      const state = getState()
      const wallet = state.data.wallet
      const popr = state.data.checkout.data;
      if (!wallet) {
        throw new Error('Need Wallet')
      }
      const address = getAddress(wallet)
      const { review, rating } = data
      if (popr === null) {
        throw new Error('Need PoPR')
      }
      const reviewRecord = {
        popr,
        currency_symbol: 'tBTC',
        amount: popr.amount,
        customer_address: address,
        vendor_address: popr.vendorAddress,
        review: {
          text: review || ''
        },
        author: {
          name: wallet.did.publicDidDocument.id
        },
        subject: {
          did: popr.vendor_did
        },
        detailed_review: [],
        rating_detail: {
          min: 0,
          max: 5,
          value: rating
        },
        verifiable: true,
        proof: null, // TODO: need to use this eventually
        chlu_version: 0
      }
      try {
        console.log('Getting ChluIPFS')
        const chluIpfs = await getChluIPFS()
        try {
          console.log('Storing review record (no publish)')
          const multihash = await chluIpfs.storeReviewRecord(reviewRecord, { publish: false })
          console.log('Creating transaction')
          console.log(popr.amount)
          try {
            const tr = new CreateChluTransaction(process.env.REACT_APP_BLOCKCYPHER_TOKEN)
            tr.getImportedKey(wallet.bitcoinMnemonic)
            const response = await tr.create(address, popr.vendorAddress, popr.amount, null, multihash)
            console.log(response)
            try {
              console.log('Pushing transaction')
              const tx = await tr.pushTransaction(response)
              console.log('Publishing review record')
              try {
                await chluIpfs.storeReviewRecord(reviewRecord, {
                  bitcoinTransactionHash: tx.hash
                })
                toastr.success('success', 'Payment success')
                dispatch(setPaymentSuccess())
              } catch (exception) {
                console.log('Error saving review record')
                console.log(exception)
                toastr.error("Unable to save review",
                             "Your payment went through, but the review wasn't saved. The review will be saved when you access the wallet again later.")
                dispatch(setPaymentError(exception.message || exception))
                return
              }
            } catch (exception) {
              console.log('Error pushing transaction')
              console.log(exception)
              toastr.error("Check Wallet Balance",
                           "There was an error making the payment. Please check your wallet's balance")
              dispatch(setPaymentError(exception.message || exception))
              return
            }
          } catch (exception) {
            console.log('Error creating transaction')
            console.log(exception)
            toastr.error("Check Wallet Balance",
                         "There was an error making the payment. Please check your wallet's balance")
            dispatch(setPaymentError(exception.message || exception))
            return
          }
        } catch (exception) {
          console.log('Error creating the review')
          console.log(exception)
          toastr.error("Review Error",
                       "There was an error creating the review. Your funds were not spent. Please check your network and try again")
          dispatch(setPaymentError(exception.message || exception))
          return
        }
      } catch (exception) {
        console.log('IPFS unreachable')
        console.log(exception)
        toastr.error("Network Error",
                     "IPFS is unreachable, please check your network connection and try again")
        dispatch(setPaymentError(exception.message || exception))
        return
      }      
    } catch (exception) {
      console.log(exception)
      toastr.error("Unknown Error",
                   "There was an error making the payment. Please try again later.")
      dispatch(setPaymentError(exception.message || exception))
      return
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [SET_PAYMENT_SUCCESS]: (state) => ({
    ...state,
    loading: false,
    error: null
  }),
  [SET_PAYMENT_ERROR]: (state, { payload: { error } }) => ({
    ...state,
    loading: false,
    error
  }),
  [SET_PAYMENT_LOADING]: (state, { payload: loading }) => ({
    ...state,
    loading
  })
}, initialState)
