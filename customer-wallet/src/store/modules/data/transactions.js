import { readReviewRecord } from './reviews'
import FetchTransactionHistory from 'chlu-wallet-support-js/lib/fetch_transaction_history'
import getOpReturn from 'chlu-wallet-support-js/src/get_opreturn' // TODO: use lib
import multihashes from 'multihashes'
const blockCypherKey = process.env.REACT_APP_BLOCKCYPHER_TOKEN

const GET_TRANSACTIONS_LOADING = 'GET_TRANSACTIONS_LOADING'
const GET_TRANSACTIONS_SUCCESS = 'GET_TRANSACTIONS_SUCCESS'
const GET_TRANSACTIONS_ERROR = 'GET_TRANSACTIONS_ERROR'

function isStringMultihash(str) {
  try {
    multihashes.fromB58String(str)
    return true
  } catch (error) {
    return false
  }
}

export function getTransactions(type, address) {
  return async dispatch => {
    dispatch({
        type: type + '/' + GET_TRANSACTIONS_LOADING
    })
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
      dispatch({
          type: type + '/' + GET_TRANSACTIONS_SUCCESS,
          payload: fixResponse
      })
      return response
    } catch (error) {
      dispatch({
          type: type + '/' + GET_TRANSACTIONS_ERROR,
          payload: error
      })
      throw error
    }
  }
}