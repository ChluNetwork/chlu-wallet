import { createAction, handleActions } from 'redux-actions'
// helpers
import { get } from 'lodash'
import { getChluAPIClient } from 'helpers/chlu'
import FetchTransactionHistory from 'chlu-wallet-support-js/lib/fetch_transaction_history'
import getOpReturn from 'chlu-wallet-support-js/lib/get_opreturn'
import multihashes from 'multihashes'
import { updateReviewRecord } from 'helpers/transactions'
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
const READ_REVIEWRECORD_LOADING = 'bitcoin/READ_REVIEWRECORD_LOADING'
const READ_REVIEWRECORD_SUCCESS = 'bitcoin/READ_REVIEWRECORD_SUCCESS'
const READ_REVIEWRECORD_ERROR = 'bitcoin/READ_REVIEWRECORD_ERROR'
const UPDATE_TRANSACTIONS = 'bitcoin/UPDATE_TRANSACTIONS'

const initialState = {
  loading: false,
  error: null,
  data: {},
  reviews: {}
}

// ------------------------------------
// Actions
// ------------------------------------
export const updateTransactions = createAction(UPDATE_TRANSACTIONS)
const readReviewRecordLoading = createAction(READ_REVIEWRECORD_LOADING)
const readReviewRecordSuccess = createAction(READ_REVIEWRECORD_SUCCESS)
const readReviewRecordError = createAction(READ_REVIEWRECORD_ERROR)

function readReviewRecord (txHash, multihash) {
  return async dispatch => {
    dispatch(readReviewRecordLoading({ txHash, multihash }))
    try {
      const chluIpfs = await getChluAPIClient()
      const reviewRecord = await chluIpfs.readReviewRecord(multihash)
      reviewRecord.txHash = txHash
      dispatch(readReviewRecordSuccess({ reviewRecord, multihash, txHash }))
    } catch (error) {
      dispatch(readReviewRecordError({ error, multihash, txHash }))
    }
  }
}

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
  }),
  [READ_REVIEWRECORD_LOADING]: (state, { payload: { multihash, txHash } }) => ({
    ...state,
    reviews: {
      ...updateReviewRecord(get(state, 'reviews', {}), txHash, { loading: true, multihash })
    }
  }),
  [READ_REVIEWRECORD_SUCCESS]: (state, { payload: { reviewRecord, multihash, txHash } }) => ({
    ...state,
    reviews: {
      ...updateReviewRecord(get(state, 'reviews', {}), txHash, Object.assign({}, reviewRecord, { loading: false }))
    }
  }),
  [READ_REVIEWRECORD_ERROR]: (state, { payload: { error, txHash, multihash } }) => ({
    ...state,
    reviews: {
      ...updateReviewRecord(
        get(state, 'reviews', {}),
        txHash,
        { error: error.message || error, loading: false, multihash }
      )
    }
  }),
}, initialState)
