import { createAction, handleActions } from 'redux-actions'
// helpers
import { get } from 'lodash'
import { readReviewRecord } from './reviews'
import FetchTransactionHistory from 'chlu-wallet-support-js/lib/fetch_transaction_history'
import getOpReturn from 'chlu-wallet-support-js/lib/get_opreturn'
import multihashes from 'multihashes'
const blockCypherKey = process.env.REACT_APP_BLOCKCYPHER_TOKEN

function isStringMultihash(str) {
  try {
    multihashes.fromB58String(str)
    return true
  } catch (error) {
    return false
  }
}

// ------------------------------------
// Constants
// ------------------------------------
const GET_TRANSACTIONS_LOADING = 'bitcoin/GET_TRANSACTIONS_LOADING'
const GET_TRANSACTIONS_SUCCESS = 'bitcoin/GET_TRANSACTIONS_SUCCESS'
const GET_TRANSACTIONS_ERROR = 'bitcoin/GET_TRANSACTIONS_ERROR'
// update
const UPDATE_TRANSACTIONS = 'bitcoin/UPDATE_TRANSACTIONS'

const initialState = {
  loading: false,
  error: null,
  data: {}
}

// ------------------------------------
// Actions
// ------------------------------------
export const updateTransactions = createAction(UPDATE_TRANSACTIONS)

export function getTransactions(address) {
  return async dispatch => {
    dispatch({
      type: GET_TRANSACTIONS_LOADING
    })
    try {
      const fetch = new FetchTransactionHistory(blockCypherKey)
      const txs = await fetch.getFromBlockchain(address)
      const withReviewRecords = txs.map(transaction => {
        const opReturn = getOpReturn(transaction)
        if (opReturn && isStringMultihash(opReturn.string)) {
          transaction.multihash = opReturn.string
          dispatch(readReviewRecord(transaction.hash, transaction.multihash))
        } else {
          transaction.multihash = null
        }
        return transaction
      })
      dispatch({
        type: GET_TRANSACTIONS_SUCCESS,
        payload: { txs: withReviewRecords }
      })
      return withReviewRecords
    } catch (error) {
      dispatch({
        type:  GET_TRANSACTIONS_ERROR,
        payload: error
      })
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
    ...state,
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
