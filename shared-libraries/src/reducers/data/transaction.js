import { createAction, handleActions } from 'redux-actions'

// data
import transactionsData from 'shared-libraries/lib/fixtures/transactionsData'

// ------------------------------------
// Constants
// ------------------------------------
const FETCH_TRANSACTION_DATA_SUCCESS = 'customer/FETCH_TRANSACTION_DATA_SUCCESS'
const FETCH_TRANSACTION_DATA_ERROR = 'customer/FETCH_TRANSACTION_DATA_ERROR'
const FETCH_TRANSACTION_DATA_LOADING = 'customer/FETCH_TRANSACTION_DATA_LOADING'
const EDIT_REVIEW_LOADING = 'customer/EDIT_REVIEW_LOADING'
const EDIT_REVIEW_ERROR = 'customer/EDIT_REVIEW_ERROR'
const EDIT_REVIEW_SUCCESS = 'customer/EDIT_REVIEW_SUCCESS'

const initialState = {
  loading: false,
  error: null,
  transactions: []
}

// ------------------------------------
// Actions
// ------------------------------------
export const fetchTransactionDataSuccess = createAction(FETCH_TRANSACTION_DATA_SUCCESS)
export const fetchTransactionDataError = createAction(FETCH_TRANSACTION_DATA_ERROR)
export const fetchTransactionDataLoading = createAction(FETCH_TRANSACTION_DATA_LOADING)
export const editReviewLoading = createAction(EDIT_REVIEW_LOADING)
export const editReviewError = createAction(EDIT_REVIEW_ERROR)
export const editReviewSuccess = createAction(EDIT_REVIEW_SUCCESS)

// ------------------------------------
// Thunks
// ------------------------------------
function testReq () {
  return new Promise(resolve => setTimeout(() =>
    resolve(transactionsData), 1000))
}

export function getTransactions (data) {
  return async (dispatch) => {
    dispatch(fetchTransactionDataLoading(true))
    try {
      const response = await testReq(data)
      dispatch(fetchTransactionDataSuccess(response))
      return response
    } catch (error) {
      dispatch(fetchTransactionDataError(error))
      throw error
    }
  }
}

function testSubmitReq (data) {
  return new Promise(resolve => setTimeout(() =>
    resolve(`editing success with following data ${JSON.stringify(data)}`), 1000))
}

export function submitEditReview (data) {
  return async (dispatch) => {
    dispatch(editReviewLoading(true))
    try {
      const response = await testSubmitReq(data)
      dispatch(editReviewSuccess(data))
      return response
    } catch (error) {
      dispatch(editReviewError(error))
      throw error
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [FETCH_TRANSACTION_DATA_SUCCESS]: (state, { payload: transactions }) => ({
    ...state,
    transactions,
    loading: false,
    error: null
  }),
  [FETCH_TRANSACTION_DATA_ERROR]: (state, { payload: error }) => ({
    ...state,
    loading: false,
    error
  }),
  [FETCH_TRANSACTION_DATA_LOADING]: (state, { payload: loading }) => ({
    ...state,
    loading
  }),
  [EDIT_REVIEW_LOADING] : (state, { payload: loading }) => ({
    ...state,
    loading
  }),
  [EDIT_REVIEW_ERROR] : (state, { payload: error }) => ({
    ...state,
    loading: false,
    error
  }),
  [EDIT_REVIEW_SUCCESS] : (state, { payload: { userAddress, comment } }) => ({
    ...state,
    loading: false,
    error: null,
    transactions: state.transactions.map(transaction => {
      if(transaction.address === userAddress) {
        return {
          ...transaction,
          review: {
            ...transaction.review,
            commentsList: [
              ...transaction.review.commentsList,
              { ...comment, date: 'Aug 16, 2017' }
            ]
          }
        }
      }

      return transaction
    })
  })
}, initialState)
