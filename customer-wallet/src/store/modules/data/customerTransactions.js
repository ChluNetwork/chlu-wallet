import { createAction, handleActions } from 'redux-actions'
// helpers
import { updateTransactions } from '../../../helpers/transactions'
import { get } from 'lodash'
// api
import { readReviewRecord } from './reviews'
import FetchTransactionHistory from 'chlu-wallet-support-js/lib/fetch_transaction_history'
import getOpReturn from 'chlu-wallet-support-js/src/get_opreturn' // TODO: use lib
import multihashes from 'multihashes'
// env
const blockCypherKey = process.env.REACT_APP_BLOCKCYPHER_TOKEN

// ------------------------------------
// Constants
// ------------------------------------
const GET_TRANSACTIONS_LOADING = 'customer/GET_TRANSACTIONS_LOADING'
const GET_TRANSACTIONS_SUCCESS = 'customer/GET_TRANSACTIONS_SUCCESS'
const GET_TRANSACTIONS_ERROR = 'customer/GET_TRANSACTIONS_ERROR'
// update
const UPDATE_TRANSACTIONS = 'customer/UPDATE_TRANSACTIONS'

const initialState = {
  loading: false,
  error: null,
  data: {}
}

function isStringMultihash(str) {
  try {
    multihashes.fromB58String(str)
    return true
  } catch (error) {
    return false
  }
}

// ------------------------------------
// Actions
// ------------------------------------
export const getTransactionsLoading = createAction(GET_TRANSACTIONS_LOADING)
export const getTransactionsSuccess = createAction(GET_TRANSACTIONS_SUCCESS)
export const getTransactionsError = createAction(GET_TRANSACTIONS_ERROR)
export const updateCustomerTransactions = createAction(UPDATE_TRANSACTIONS)
// ------------------------------------
// Thunks
// ------------------------------------
export function getCustomerTransactions (address) {
  return async dispatch => {
    dispatch(getTransactionsLoading())
    try {
      const fetch = new FetchTransactionHistory(blockCypherKey)
      const response = await fetch.getFromBlockchain(address)
      const withReviewRecords = response.txs.map(transaction => {
        const opReturn = getOpReturn(transaction)
        if (opReturn && isStringMultihash(opReturn.string)) {
          transaction.multihash = opReturn.string
          dispatch(readReviewRecord(transaction.hash, transaction.multihash))
        } else {
          transaction.multihash = null
        }
        return transaction
      })
      const fixResponse = {
        ...response,
        txs: withReviewRecords
      }
      dispatch(getTransactionsSuccess(fixResponse))
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
  }),
  [UPDATE_TRANSACTIONS]: (state, { payload: transaction }) => ({
    ...state,
    data: {
      ...state.data,
      txs: updateTransactions(get(state.data, 'txs', []), transaction)
    }
  })
}, initialState)
