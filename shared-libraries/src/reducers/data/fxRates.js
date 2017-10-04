import { createAction, handleActions } from 'redux-actions'
// utils
import { getExchangeRates } from 'shared-libraries/lib/utils/exchangeReq'

// ------------------------------------
// Constants
// ------------------------------------
const FETCH_RATES_SUCCESS = 'FETCH_RATES_SUCCESS'
const FETCH_RATES_ERROR = 'FETCH_RATES_ERROR'
const FETCH_RATES_LOADING = 'FETCH_RATES_LOADING'

const initialState = {
  loading: false,
  error: null,
  rates: null
}

// ------------------------------------
// Actions
// ------------------------------------
export const fetchRatesSuccess = createAction(FETCH_RATES_SUCCESS)
export const fetchRatesError = createAction(FETCH_RATES_ERROR)
export const fetchRatesLoading = createAction(FETCH_RATES_LOADING)
// ------------------------------------
// Thunks
// ------------------------------------
const getFxRates = () => {
  return getExchangeRates()
    .then(data => data)
    .catch(error => { throw error })
}

export function getRates () {
  return async (dispatch) => {
    dispatch(fetchRatesLoading(true))
    try {
      const response = await getFxRates()
      dispatch(fetchRatesSuccess(response))
      return response
    } catch (error) {
      dispatch(fetchRatesError(error))
      throw error
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [FETCH_RATES_SUCCESS]: (state, { payload: rates }) => ({
    ...state,
    loading: false,
    error: null,
    rates
  }),
  [FETCH_RATES_ERROR]: (state, { payload: error }) => ({
    ...state,
    loading: false,
    error
  }),
  [FETCH_RATES_LOADING]: (state, { payload: loading }) => ({
    ...state,
    loading
  })
}, initialState)
