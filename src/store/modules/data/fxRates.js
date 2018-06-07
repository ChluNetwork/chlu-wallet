import { createAction, handleActions } from 'redux-actions'
// utils
import { getExchangeRates } from 'helpers/exchangeReq'
// fixtures
import rates from 'fixtures/rates'

// ------------------------------------
// Constants
// ------------------------------------
const FETCH_RATES_LOADING = 'rates/FETCH_RATES_LOADING'
const FETCH_RATES_SUCCESS = 'rates/FETCH_RATES_SUCCESS'
const FETCH_RATES_ERROR = 'rates/FETCH_RATES_ERROR'

const initialState = {
  loading: false,
  error: null,
  rates
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
export function getRates () {
  return async (dispatch) => {
    dispatch(fetchRatesLoading(true))
    try {
      const response = await getExchangeRates()
      dispatch(fetchRatesSuccess(response))
      return response
    } catch (error) {
      dispatch(fetchRatesError(error))
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [FETCH_RATES_LOADING]: (state) => ({
    ...state,
    loading: true
  }),
  [FETCH_RATES_SUCCESS]: (state, { payload: rates }) => ({
    loading: false,
    error: null,
    rates
  }),
  [FETCH_RATES_ERROR]: (state, { payload: error }) => ({
    ...state,
    loading: false,
    error
  })
}, initialState)
