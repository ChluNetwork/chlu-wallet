import { createAction, handleActions } from 'redux-actions'
import { getChluIPFS } from 'helpers/chlu'
import { toastr } from 'react-redux-toastr'
import { getAddress } from 'helpers/wallet';
import { createTransaction } from 'helpers/payment';

// ------------------------------------
// Constants
// ------------------------------------
export const SET_PAYMENT_SUCCESS = 'payment/SET_PAYMENT_SUCCESS'
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

export const paymentStepLoadingMessages = [
  null,
  'Preparing Payment and Review data',
  'Syncing with Chlu IPFS Distributed System',
  'Preparing Chlu Review',
  'Creating Cryptocurrency Transaction',
  'Publishing Cryptocurrency Transaction',
  'Publishing Chlu Review. Please wait until the review is replicated by a Chlu Collector',
]

export function submitPayment (data) {
  return async (dispatch, getState) => {
    dispatch(setPaymentLoading(1))
    try {
      let step = 1
      const state = getState()
      const wallet = state.data.wallet
      const popr = state.data.checkout.data;
      if (!wallet) {
        throw new Error('Need Wallet')
      }
      const address = getAddress(wallet)
      const { review, rating } = data
      console.log('RATING', rating)
      if (popr === null) {
        throw new Error('Need PoPR')
      }
      const reviewRecord = {
        popr,
        currency_symbol: 'tBTC',
        amount: popr.amount,
        customer_address: address,
        vendor_address: popr.vendor_address,
        review: {
          text: review || ''
        },
        author: {
          name: wallet.did.publicDidDocument.id
        },
        subject: {
          did: popr.vendor_did
        },
        platform: {
          name: 'Chlu Wallet (testnet)',
          url: 'https://wallet.chlu.io'
        },
        detailed_review: [],
        rating_details: {
          min: 0,
          max: 5,
          value: rating
        },
        verifiable: true,
        verification: null, // TODO: need to use this eventually
        chlu_version: 0
      }
      console.log(reviewRecord)
      // TODO: clean up this mess
      let chluIpfs, multihash, transaction, pushedTransaction
      // Step 1: Start ChluIPFS
      try {
        dispatch(setPaymentLoading(++step))
        console.log('Getting ChluIPFS')
        chluIpfs = await getChluIPFS()
      } catch (exception) {
        console.log('IPFS unreachable')
        console.log(exception)
        toastr.error('Network Error',
                     'IPFS is unreachable, please check your network connection and try again')
        dispatch(setPaymentError(exception.message || exception))
        return false
      }      
      // Step 2: Store ReviewRecord
      try {
        dispatch(setPaymentLoading(++step))
        console.log('Storing review record (no publish)')
        multihash = await chluIpfs.storeReviewRecord(reviewRecord, { publish: false })
      } catch (exception) {
        console.log('Error creating the review')
        console.log(exception)
        toastr.error('Review Error',
                      'There was an error creating the review. Your funds were not spent. Please check your network and try again')
        dispatch(setPaymentError(exception.message || exception))
        return false
      }
      // Step 3: create blockchain transaction
      try {
        dispatch(setPaymentLoading(++step))
        transaction = await createTransaction(wallet.bitcoinMnemonic, popr.amount, address, popr.vendor_address,multihash)
      } catch (exception) {
        console.log('Error creating transaction')
        console.log(exception)
        toastr.error('Check Wallet Balance',
                      "There was an error making the payment. Please check your wallet's balance")
        dispatch(setPaymentError(exception.message || exception))
        return false
      }
      // Step 4: publish blockchain transaction
      try {
        dispatch(setPaymentLoading(++step))
        pushedTransaction = await transaction.pushTransaction()
      } catch (exception) {
        console.log('Error pushing transaction')
        console.log(exception)
        toastr.error('Check Wallet Balance',
                      "There was an error making the payment. Please check your wallet's balance")
        dispatch(setPaymentError(exception.message || exception))
        return false
      }
      // Step 5: Publishing review record
      try {
        dispatch(setPaymentLoading(++step))
        console.log(reviewRecord)
        await chluIpfs.storeReviewRecord(reviewRecord, {
          bitcoinTransactionHash: pushedTransaction.hash,
          expectedMultihash: multihash
        })
        toastr.success('Payment Completed', 'Your payment and review have been submitted to the Chlu IPFS distributed system and will appear shortly')
        dispatch(setPaymentSuccess())
        return true
      } catch (exception) {
        console.log('Error saving review record')
        console.log(exception)
        toastr.error('Unable to save review',
                      "Your payment went through, but the review wasn't saved. The review will be saved when you access the wallet again later.")
        dispatch(setPaymentError(exception.message || exception))
        return false
      }
    } catch (exception) {
      console.log(exception)
      toastr.error('Unknown Error',
                    'Something went wrong')
      dispatch(setPaymentError(exception.message || exception))
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
    loadingStep: 0,
    loadingMessage: null,
    error: null
  }),
  [SET_PAYMENT_ERROR]: (state, { payload: { error } }) => ({
    ...state,
    loading: false,
    loadingStep: 0,
    loadingMessage: null,
    error
  }),
  [SET_PAYMENT_LOADING]: (state, { payload: step }) => ({
    ...state,
    loading: step > 0,
    loadingStep: step || 0,
    loadingMessage: paymentStepLoadingMessages[step] || null
  })
}, initialState)
