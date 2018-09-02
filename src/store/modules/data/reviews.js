import { createAction, handleActions } from 'redux-actions'
import { getChluAPIClient, getChluIPFS } from 'helpers/chlu'
import { updateReviewRecord } from 'helpers/transactions'
import { get, set, find, cloneDeep } from 'lodash'
import { DELETE_WALLET } from './wallet';

// ------------------------------------
// Constants
// ------------------------------------
const EDIT_REVIEW = 'EDIT_REVIEW'
const EDIT_REVIEW_LOADING = 'EDIT_REVIEW_LOADING'
const EDIT_REVIEW_SUCCESS = 'EDIT_REVIEW_SUCCESS'
const EDIT_REVIEW_ERROR = 'EDIT_REVIEW_ERROR'
const EDIT_REVIEW_CANCEL = 'EDIT_REVIEW_CANCEL'
const READ_REVIEWRECORD_LOADING = 'reviewsiwrote/READ_REVIEWRECORD_LOADING'
const READ_REVIEWRECORD_SUCCESS = 'reviewsiwrote/READ_REVIEWRECORD_SUCCESS'
const READ_REVIEWRECORD_ERROR = 'reviewsiwrote/READ_REVIEWRECORD_ERROR'
const READ_REVIEWS_I_WROTE_LOADING = 'reviewsiwrote/READ_REVIEWS_I_WROTE_LOADING'
const READ_REVIEWS_I_WROTE_SUCCESS= 'reviewsiwrote/READ_REVIEWS_I_WROTE_SUCCESS'
const READ_REVIEWS_I_WROTE_ERROR = 'reviewsiwrote/READ_REVIEWS_I_WROTE__ERROR'

function getInitialState() {
  return {
    loading: false,
    error: null,
    reviewsIWrote: [],
    reviewsIWroteError: null,
    reviewsIWroteLoading: false,
    reviews: {}
  }
}

// ------------------------------------
// Actions
// ------------------------------------
export const editReview = createAction(EDIT_REVIEW)
export const cancelEditReview = createAction(EDIT_REVIEW_CANCEL)
const editReviewLoading = createAction(EDIT_REVIEW_LOADING)
const editReviewError = createAction(EDIT_REVIEW_ERROR)
const editReviewSuccess = createAction(EDIT_REVIEW_SUCCESS)
const readReviewRecordLoading = createAction(READ_REVIEWRECORD_LOADING)
const readReviewRecordSuccess = createAction(READ_REVIEWRECORD_SUCCESS)
const readReviewRecordError = createAction(READ_REVIEWRECORD_ERROR)
const readReviewsIWroteLoading = createAction(READ_REVIEWS_I_WROTE_LOADING)
const readReviewsIWroteSuccess = createAction(READ_REVIEWS_I_WROTE_SUCCESS)
const readReviewsIWroteError = createAction(READ_REVIEWS_I_WROTE_ERROR)

// ------------------------------------
// Thunks
// ------------------------------------

export function readReviewsIWrote () {
  return async (dispatch, getState) => {
    const state = getState()
    const didId = get(state, 'data.wallet.did.publicDidDocument.id', null)
    if (didId) {
      dispatch(readReviewsIWroteLoading())
      try {
        // TODO: improve this and use a loading system per-review
        const chluApiClient = await getChluAPIClient()
        const list = await chluApiClient.getReviewsWrittenByDID(didId)
        const reviews = {}
        for (const review of list.rows) {
          const multihash = review.multihash
          const content = get(review, 'reviewRecord', {})
          const resolved = get(content, 'resolved', false)
          // TODO: show them as loading and dispatch redux actions to resolve them
          reviews[multihash] = { multihash, loading: !resolved, error: null, ...content }
          // Only read the review if the api client did not return it resolved
          if (!resolved) dispatch(readReviewRecord(multihash))
        }
        dispatch(readReviewsIWroteSuccess(reviews))
      } catch (error) {
        console.log(error)
        dispatch(readReviewsIWroteError(error.message || error))
      }
    } else {
      dispatch(readReviewsIWroteError('Not logged in'))
    }
  }
}

export function readReviewRecord (txHash, multihash) {
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
      const multihash = editing
      const review = find(reviews, r => r.multihash === multihash)
      const updatedReview = cloneDeep(review)
      set(updatedReview, 'previous_version_multihash', multihash)
      set(updatedReview, 'rating_details.value', fields.rating)
      set(updatedReview, 'review.text', fields.comment)
      const chluIpfs = await getChluIPFS()
      const updatedMultihash = await chluIpfs.storeReviewRecord(updatedReview)
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
  [READ_REVIEWS_I_WROTE_LOADING]: state => ({
    ...state,
    reviewsIWroteLoading: true
  }),
  [READ_REVIEWS_I_WROTE_SUCCESS]: (state, { payload: reviews }) => ({
    ...state,
    reviewsIWroteLoading: false,
    reviewsIWrote: reviews
  }),
  [READ_REVIEWS_I_WROTE_ERROR]: (state, { payload: error }) => ({
    ...state,
    reviewsIWroteLoading: false,
    reviewsIWroteError: error
  }),
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
      ...updateReviewRecord(
        get(state, 'reviews', {}),
        txHash,
        { error: error.message || error, loading: false, multihash }
      )
    }
  }),
  [DELETE_WALLET]: state => getInitialState()
}, getInitialState())
