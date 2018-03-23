import { createAction, handleActions } from 'redux-actions'
import { getChluIPFS, types } from 'helpers/ipfs'
import { updateReviewRecord, getTxHashByMultihash } from '../../../helpers/transactions'
import { get, find } from 'lodash'
// ------------------------------------
// Constants
// ------------------------------------
const EDIT_REVIEW = 'customer/EDIT_REVIEW'
const EDIT_REVIEW_LOADING = 'customer/EDIT_REVIEW_LOADING'
const EDIT_REVIEW_SUCCESS = 'customer/EDIT_REVIEW_SUCCESS'
const EDIT_REVIEW_ERROR = 'customer/EDIT_REVIEW_ERROR'
const EDIT_REVIEW_CANCEL = 'customer/EDIT_REVIEW_CANCEL'
const UPDATE_REVIEW_RECORD = 'UPDATE_REVIEW_RECORD'
const READ_REVIEWRECORD_LOADING = 'READ_REVIEWRECORD_LOADING'
const READ_REVIEWRECORD_SUCCESS = 'READ_REVIEWRECORD_SUCCESS'
const READ_REVIEWRECORD_ERROR = 'READ_REVIEWRECORD_ERROR'

const initialState = {
  loading: false,
  error: null,
  reviews: {}
}

// ------------------------------------
// Actions
// ------------------------------------
export const editReview = createAction(EDIT_REVIEW)
export const cancelEditReview = createAction(EDIT_REVIEW_CANCEL)
export const editReviewLoading = createAction(EDIT_REVIEW_LOADING)
export const editReviewError = createAction(EDIT_REVIEW_ERROR)
const editReviewSuccess = createAction(EDIT_REVIEW_SUCCESS)
export const updateReviewRecordAction = createAction(UPDATE_REVIEW_RECORD)
export const readReviewRecordLoading = createAction(READ_REVIEWRECORD_LOADING)
export const readReviewRecordSuccess = createAction(READ_REVIEWRECORD_SUCCESS)
export const readReviewRecordError = createAction(READ_REVIEWRECORD_ERROR)

// ------------------------------------
// Thunks
// ------------------------------------

export function readReviewRecord (type, txHash, multihash) {
  return async dispatch => {
    dispatch(readReviewRecordLoading({ txHash, multihash }))
    try {
      const chluIpfs = await getChluIPFS(type)
      const reviewRecord = await chluIpfs.readReviewRecord(multihash, {
        checkForUpdates: true
      })
      reviewRecord.editable = reviewRecord.orbitDb === chluIpfs.getOrbitDBAddress()
      dispatch(readReviewRecordSuccess({ reviewRecord, multihash, txHash }))
    } catch (error) {
      dispatch(readReviewRecordError({ error, multihash, txHash }))
    }
  }
}

export function submitEditedReview(fields) {
  return async (dispatch, getState) => {
    try {
      dispatch(editReviewLoading())
      const {
        data: {
          reviews: {
            reviews,
            editing
          }
        }
      } = getState()
      const chluIpfs = await getChluIPFS(types.customer)
      const multihash = editing
      const review = find(reviews, r => r.multihash === multihash)
      const updatedReview = Object.assign({}, review, {
        rating: fields.rating,
        review_text: fields.comment
      })
      const updatedMultihash = await chluIpfs.storeReviewRecord(
        updatedReview,
        {
          previousVersionMultihash: multihash
        }
      )
      dispatch(editReviewSuccess({ multihash, updatedMultihash }))
    } catch (error) {
      dispatch(editReviewError(error))
      console.log(error)
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [EDIT_REVIEW] : (state, { payload: multihash }) => ({
    ...state,
    editing: multihash,
    loading: false,
    error: null
  }),
  [EDIT_REVIEW_LOADING] : state => ({
    ...state,
    loading: true
  }),
  [EDIT_REVIEW_ERROR] : (state, { payload: error }) => ({
    ...state,
    loading: false,
    error
  }),
  [EDIT_REVIEW_SUCCESS] : (state, { payload: { multihash, updatedMultihash } }) => {
    return {
      ...state,
      loading: false,
      editing: false,
      error: null // TODO: update reviews
    }
  },
  [EDIT_REVIEW_CANCEL] : state => ({
    ...state,
    editing: false,
    loading: false
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
      ...updateReviewRecord(get(state, 'reviews', {}), txHash, { error, loading: false, multihash })
    }
  }),
  [UPDATE_REVIEW_RECORD]: (state, { payload: { multihash, newMultihash, reviewRecord } }) => ({
    ...state,
    reviews: {
      ...updateReviewRecord(get(state, 'reviews', {}), getTxHashByMultihash(get(state, 'reviews', {}), multihash), {
        ...reviewRecord,
        updatedMultihash: newMultihash
      })
    }
  })
}, initialState)
