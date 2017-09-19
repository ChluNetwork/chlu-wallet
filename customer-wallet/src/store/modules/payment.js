import { createAction, handleActions } from 'redux-actions'

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
function testReq (data) {
  return new Promise(resolve => setTimeout(() =>
    resolve(`payment success with following data ${JSON.stringify(data)}`), 1000))
}

export function submitPayment (data) {
  return async (dispatch) => {
    dispatch(setPaymentLoading(true))
    try {
      const response = await testReq(data)
      dispatch(setPaymentSuccess())
      return response
    } catch (error) {
      dispatch(setPaymentError({ error }))
      throw error
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
