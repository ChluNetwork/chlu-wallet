import { createAction, handleActions } from 'redux-actions'
import { getChluIPFS, types } from 'helpers/ipfs'
import { updateReviewRecord } from '../../../helpers/transactions'
import { get } from 'lodash'
// ------------------------------------
// Constants
// ------------------------------------
const EDIT_REVIEW_LOADING = 'customer/EDIT_REVIEW_LOADING'
const EDIT_REVIEW_ERROR = 'customer/EDIT_REVIEW_ERROR'
const EDIT_REVIEW_SUCCESS = 'customer/EDIT_REVIEW_SUCCESS'
const READ_REVIEWRECORD_LOADING = 'customer/READ_REVIEWRECORD_LOADING'
const READ_REVIEWRECORD_SUCCESS = 'customer/READ_REVIEWRECORD_SUCCESS'
const READ_REVIEWRECORD_ERROR = 'customer/READ_REVIEWRECORD_ERROR'

const initialState = {
  loading: false,
  error: null,
  reviews: {}
}

// ------------------------------------
// Actions
// ------------------------------------
export const editReviewLoading = createAction(EDIT_REVIEW_LOADING)
export const editReviewError = createAction(EDIT_REVIEW_ERROR)
export const editReviewSuccess = createAction(EDIT_REVIEW_SUCCESS)
export const readReviewRecordLoading = createAction(READ_REVIEWRECORD_LOADING)
export const readReviewRecordSuccess = createAction(READ_REVIEWRECORD_SUCCESS)
export const readReviewRecordError = createAction(READ_REVIEWRECORD_ERROR)

// ------------------------------------
// Thunks
// ------------------------------------

export function readReviewRecord (txHash, multihash) {
  return async dispatch => {
    dispatch(readReviewRecordLoading({ txHash, multihash }))
    console.log('Read Review Record', multihash)
    const chluIpfs = await getChluIPFS(types.customer)
    try {
      const reviewRecord = await chluIpfs.readReviewRecord(multihash)
      dispatch(readReviewRecordSuccess({ reviewRecord, multihash, txHash }))
    } catch (error) {
      dispatch(readReviewRecordError({ error, multihash, txHash }))
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
  },
  [READ_REVIEWRECORD_LOADING]: (state, { payload: { multihash, txHash } }) => ({
    ...state,
    reviews: {
      ...updateReviewRecord(get(state, 'reviews', {}), txHash, { loading: true, multihash })
    }
  }),
  [READ_REVIEWRECORD_SUCCESS]: (state, { payload: { reviewRecord, multihash, txHash } }) => ({
    ...state,
    reviews: {
      ...updateReviewRecord(get(state, 'reviews', {}), txHash, Object.assign(reviewRecord, { loading: false }))
    }
  }),
  [READ_REVIEWRECORD_ERROR]: (state, { payload: { error, txHash, multihash } }) => ({
    ...state,
    reviews: {
      ...updateReviewRecord(get(state, 'reviews', {}), txHash, { error, loading: false, multihash })
    }
  })
}, initialState)
