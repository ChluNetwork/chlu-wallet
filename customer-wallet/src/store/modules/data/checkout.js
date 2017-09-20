import { createAction, handleActions } from 'redux-actions'

// data
import checkoutData from '../../../fixtures/checkout'

// ------------------------------------
// Constants
// ------------------------------------
const FETCH_CHECKOUT_DATA_SUCCESS = 'FETCH_CHECKOUT_DATA_SUCCESS'
const FETCH_CHECKOUT_DATA_ERROR = 'FETCH_CHECKOUT_DATA_ERROR'
const FETCH_CHECKOUT_DATA_LOADING = 'FETCH_CHECKOUT_DATA_LOADING'

const initialState = {
  loading: false,
  error: null,
  data: {}
}

// ------------------------------------
// Actions
// ------------------------------------
export const fetchCheckoutDataSuccess = createAction(FETCH_CHECKOUT_DATA_SUCCESS)
export const fetchCheckoutDataError = createAction(FETCH_CHECKOUT_DATA_ERROR)
export const fetchCheckoutDataLoading = createAction(FETCH_CHECKOUT_DATA_LOADING)

// ------------------------------------
// Thunks
// ------------------------------------
function testReq () {
  return new Promise(resolve => setTimeout(() =>
    resolve(checkoutData), 1000))
}

export function getCheckout () {
  return async (dispatch) => {
    dispatch(fetchCheckoutDataLoading(true))
    try {
      const response = await testReq()
      dispatch(fetchCheckoutDataSuccess(response))
      return response
    } catch (error) {
      dispatch(fetchCheckoutDataError(error))
      throw error
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [FETCH_CHECKOUT_DATA_SUCCESS]: (state, { payload: data }) => ({
    ...state,
    data,
    loading: false,
    error: null
  }),
  [FETCH_CHECKOUT_DATA_ERROR]: (state, { payload: { error } }) => ({
    ...state,
    loading: false,
    error
  }),
  [FETCH_CHECKOUT_DATA_LOADING]: (state, { payload: loading }) => ({
    ...state,
    loading
  })
}, initialState)
