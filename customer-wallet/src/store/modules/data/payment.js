import { createAction, handleActions } from 'redux-actions'
import { getChluIPFS, types } from 'helpers/ipfs'
import { toastr } from 'react-redux-toastr'
import Lightning from 'helpers/ln';

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
      const {
        toAddress,
        activeAddress,
        review,
        amountSatoshi,
        rating,
        blockchainClient: {
          createChluTransaction: tr
        }
      } = data
      const popr = getState().data.checkout.data;
      if (popr === null) {
        throw new Error('Need PoPR')
      }
      const reviewRecord = {
        popr,
        currency_symbol: 'satoshi',
        amount: amountSatoshi,
        customer_address: activeAddress,
        vendor_address: toAddress,
        review_text: review || '', // TODO: fix missing string field encoding different from empty string
        detailed_review: [],
        rating: rating,
        chlu_version: 0
      }
      const fromNode = new Lightning(Lightning.nodes.Enrico)
      const toNode = new Lightning(Lightning.nodes.Andronikos)
      try {
        console.log('Getting ChluIPFS')
        const chluIpfs = await getChluIPFS(types.customer)
        console.log('Getting LND')
        console.log(Lightning.nodes)
        try {
          console.log('Storing review record (no publish)')
          const multihash = await chluIpfs.storeReviewRecord(reviewRecord, { publish: false })
          console.log('Creating Invoice')
          console.log(amountSatoshi)
          try {
            const invoice = await toNode.generateInvoice(amountSatoshi)
            console.log(invoice)
            try {
              console.log('Paying invoice')
              const response = await fromNode.payInvoice(invoice)
              console.log(response)
              console.log('Publishing review record')
              try {
                //await chluIpfs.storeReviewRecord(reviewRecord)
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
