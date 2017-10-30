import { createAction, handleActions } from 'redux-actions'
// data
import reviews from '../../fixtures/reviews'
// ------------------------------------
// Constants
// ------------------------------------
const FETCH_REVIEWS_SUCCESS = 'customer/FETCH_REVIEWS_SUCCESS'
const FETCH_REVIEWS_ERROR = 'customer/FETCH_REVIEWS_ERROR'
const FETCH_REVIEWS_LOADING = 'customer/FETCH_REVIEWS_LOADING'
const EDIT_REVIEW_LOADING = 'customer/EDIT_REVIEW_LOADING'
const EDIT_REVIEW_ERROR = 'customer/EDIT_REVIEW_ERROR'
const EDIT_REVIEW_SUCCESS = 'customer/EDIT_REVIEW_SUCCESS'

const initialState = {
  loading: false,
  error: null,
  data: {}
}

// ------------------------------------
// Actions
// ------------------------------------
export const fetchReviewsSuccess = createAction(FETCH_REVIEWS_SUCCESS)
export const fetchReviewsError = createAction(FETCH_REVIEWS_ERROR)
export const fetchReviewsLoading = createAction(FETCH_REVIEWS_LOADING)
export const editReviewLoading = createAction(EDIT_REVIEW_LOADING)
export const editReviewError = createAction(EDIT_REVIEW_ERROR)
export const editReviewSuccess = createAction(EDIT_REVIEW_SUCCESS)

// ------------------------------------
// Thunks
// ------------------------------------
function testReq (address) {
  return new Promise(resolve => setTimeout(() => {
    const filterReviews = reviews.find(({ address: adr }) => adr === address )
    filterReviews ? resolve(filterReviews) : resolve({})
  }, 1000))
}

export function fetchReviews (address) {
  return async (dispatch) => {
    dispatch(fetchReviewsLoading(true))
    try {
      const response = await testReq(address)
      dispatch(fetchReviewsSuccess(response))
      return response
    } catch (error) {
      dispatch(fetchReviewsError(error))
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
  [FETCH_REVIEWS_SUCCESS]: (state, { payload: data }) => ({
    ...state,
    data,
    loading: false,
    error: null
  }),
  [FETCH_REVIEWS_ERROR]: (state, { payload: error }) => ({
    ...state,
    loading: false,
    error
  }),
  [FETCH_REVIEWS_LOADING]: (state, { payload: loading }) => ({
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
  [EDIT_REVIEW_SUCCESS] : (state, { payload: { address, comment } }) => {
    const data = state.data

    return {
      ...state,
      loading: false,
      error: null,
      data: {
        ...data,
        address: data.address ? data.address : address,
        reviews: data.reviews
          ? [
            ...data.reviews,
            comment
          ]
          : [comment]
      }
    }
  }
}, initialState)
