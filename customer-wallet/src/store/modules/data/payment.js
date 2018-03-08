import { createAction, handleActions } from 'redux-actions'
import { getChluIPFS, types } from 'helpers/ipfs'
import { toastr } from 'react-redux-toastr'

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
      const chluIpfs = await getChluIPFS(types.customer)
      const multihash = await chluIpfs.storeReviewRecord(reviewRecord, { publish: false })
      const response = await tr.create(activeAddress, toAddress, amountSatoshi, null, multihash)
      console.log(response)
      await tr.pushTransaction(response)
      await chluIpfs.storeReviewRecord(reviewRecord)
      toastr.success('success', 'Payment success')
      dispatch(setPaymentSuccess())
    } catch(exception) {
      console.log(exception)
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
