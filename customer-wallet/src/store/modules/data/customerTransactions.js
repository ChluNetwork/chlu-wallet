import { createAction, handleActions } from 'redux-actions'
// helpers
import { getMonthYear, getMonthDateYear } from 'helpers/Date'
import { get } from 'lodash'
// api
import FetchTransactionHistory from 'chlu-wallet-support-js/lib/fetch_transaction_history'

// ------------------------------------
// Constants
// ------------------------------------
const GET_TRANSACTIONS_LOADING = 'customer/GET_TRANSACTIONS_LOADING'
const GET_TRANSACTIONS_SUCCESS = 'customer/GET_TRANSACTIONS_SUCCESS'
const GET_TRANSACTIONS_ERROR = 'customer/GET_TRANSACTIONS_ERROR'

const initialState = {
  loading: false,
  error: null,
  data: {}
}

// ------------------------------------
// Actions
// ------------------------------------
export const getTransactionsLoading = createAction(GET_TRANSACTIONS_LOADING)
export const getTransactionsSuccess = createAction(GET_TRANSACTIONS_SUCCESS)
export const getTransactionsError = createAction(GET_TRANSACTIONS_ERROR)

// ------------------------------------
// Thunks
// ------------------------------------
export function getCustomerTransactions (address) {
  return async (dispatch) => {
    dispatch(getTransactionsLoading())
    try {
      const fetch = new FetchTransactionHistory()
      const response = await fetch.getFromBlockchain(address)
      const fixResponce = {
        ...response,
        txs: response.txs.map((transaction) => ({
          ...transaction,
          shortDate: getMonthYear(get(transaction, 'received', new Date())),
          longDate: getMonthDateYear(get(transaction, 'received', new Date())),
          isChluTransaction: Math.random() > 0.5
        }))
      }
      dispatch(getTransactionsSuccess(fixResponce))
      return response
    } catch (error) {
      dispatch(getTransactionsError(error))
      throw error
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [GET_TRANSACTIONS_LOADING]: (state) => ({
    ...state,
    loading: true
  }),
  [GET_TRANSACTIONS_SUCCESS]: (state, { payload: data }) => ({
    data,
    loading: false,
    error: null
  }),
  [GET_TRANSACTIONS_ERROR]: (state, { payload: error }) => ({
    ...state,
    loading: false,
    error
  })
}, initialState)
