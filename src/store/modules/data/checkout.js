import { createAction, handleActions } from 'redux-actions'
import { requestPopr } from 'helpers/marketplace'
import { getChluIPFS } from 'helpers/chlu'

// ------------------------------------
// Constants
// ------------------------------------
const FETCH_CHECKOUT_DATA_SUCCESS = 'checkout/FETCH_CHECKOUT_DATA_SUCCESS'
const FETCH_CHECKOUT_DATA_ERROR = 'checkout/FETCH_CHECKOUT_DATA_ERROR'
const FETCH_CHECKOUT_DATA_LOADING = 'checkout/FETCH_CHECKOUT_DATA_LOADING'

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

export function getCheckout ({ vendorId, amount }) {
  return async dispatch => {
    dispatch(fetchCheckoutDataLoading(true))
    let popr = null
    try {
      const url = process.env.REACT_APP_MARKETPLACE_URL || 'http://localhost:4000'
      console.log(`Requesting PoPR to ${url} for vendor ${vendorId}`)
      popr = await requestPopr(url, vendorId, {
        amount,
        currency_symbol: 'tBTC'
      })
      console.log(`Requested PoPR to ${url} for vendor ${vendorId}`)
      console.log(popr)
      dispatch(fetchCheckoutDataSuccess(popr))
      return popr
    } catch (error) {
      dispatch(fetchCheckoutDataError(error.message || error))
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
  [FETCH_CHECKOUT_DATA_ERROR]: (state, { payload: error }) => ({
    ...state,
    loading: false,
    error
  }),
  [FETCH_CHECKOUT_DATA_LOADING]: (state, { payload: loading }) => ({
    ...state,
    loading
  })
}, initialState)
