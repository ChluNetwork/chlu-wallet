import { createAction, handleActions } from 'redux-actions'
// helper
import { updateTransactions } from '../../../helpers/transactions'
import { get } from 'lodash'
// api
import { getTransactions } from './transactions';

// ------------------------------------
// Constants
// ------------------------------------
const GET_TRANSACTIONS_LOADING = 'vendor/GET_TRANSACTIONS_LOADING'
const GET_TRANSACTIONS_SUCCESS = 'vendor/GET_TRANSACTIONS_SUCCESS'
const GET_TRANSACTIONS_ERROR = 'vendor/GET_TRANSACTIONS_ERROR'
// update
const UPDATE_TRANSACTIONS = 'vendor/UPDATE_TRANSACTIONS'

const initialState = {
  loading: false,
  error: null,
  data: {}
}

// ------------------------------------
// Actions
// ------------------------------------
export const updateVendorTransactions = createAction(UPDATE_TRANSACTIONS)

// ------------------------------------
// Thunks
// ------------------------------------
export function getVendorTransactions (address) {
  return getTransactions('vendor', address) 
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
