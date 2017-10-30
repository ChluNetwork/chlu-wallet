import { createAction, handleActions } from 'redux-actions'
// api
import fetchTransactionHistory from 'chlu-wallet-support-js/lib/fetch_transaction_history'

// ------------------------------------
// Constants
// ------------------------------------
const FETCH_TRANSACTION_HISTORY_SUCCESS = 'customer/FETCH_TRANSACTION_HISTORY_SUCCESS'
const FETCH_TRANSACTION_HISTORY_ERROR = 'customer/FETCH_TRANSACTION_HISTORY_ERROR'
const FETCH_TRANSACTION_HISTORY_LOADING = 'customer/FETCH_TRANSACTION_HISTORY_LOADING'

const initialState = {
  loading: false,
  error: null,
  data: {}
}

// ------------------------------------
// Actions
// ------------------------------------
export const fetchTransactionHistorySuccess = createAction(FETCH_TRANSACTION_HISTORY_SUCCESS)
export const fetchTransactionHistoryError = createAction(FETCH_TRANSACTION_HISTORY_ERROR)
export const fetchTransactionHistoryLoading = createAction(FETCH_TRANSACTION_HISTORY_LOADING)

// ------------------------------------
// Thunks
// ------------------------------------
export function getTransactionHistory (address) {
  return async (dispatch) => {
    dispatch(fetchTransactionHistoryLoading(true))
    try {
      const fetch = new fetchTransactionHistory
      const response = await fetch.getFromBlockchain(address)
      const responceWithTransactionPlatform = {
        ...response,
        txs: response.txs.map((transaction) => ({
          ...transaction,
          isChluTransaction: Math.random() > 0.5
        }))
      }
      dispatch(fetchTransactionHistorySuccess(responceWithTransactionPlatform))
      return response
    } catch (error) {
      dispatch(fetchTransactionHistoryError(error))
      throw error
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [FETCH_TRANSACTION_HISTORY_SUCCESS]: (state, { payload: data }) => ({
    ...state,
    data,
    loading: false,
    error: null
  }),
  [FETCH_TRANSACTION_HISTORY_ERROR]: (state, { payload: error }) => ({
    ...state,
    loading: false,
    error
  }),
  [FETCH_TRANSACTION_HISTORY_LOADING]: (state, { payload: loading }) => ({
    ...state,
    loading
  })
}, initialState)
