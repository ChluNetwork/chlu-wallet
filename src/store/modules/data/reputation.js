import { createAction, handleActions } from 'redux-actions'
import { getChluAPIClient } from 'helpers/chlu'
import { get } from 'lodash'
import { DELETE_WALLET } from './wallet';

// ------------------------------------
// Constants
// ------------------------------------
const READ_REPUTATION_LOADING = 'reviewsaboutvendor/READ_REPUTATION_LOADING'
const READ_REPUTATION_SUCCESS = 'reviewsaboutvendor/READ_REPUTATION_SUCCESS'
const READ_REPUTATION_ERROR = 'reviewsaboutvendor/READ_REPUTATION_ERROR'
const READ_REVIEWRECORD_LOADING = 'reviewsaboutvendor/READ_REVIEWRECORD_LOADING'
const READ_REVIEWRECORD_SUCCESS = 'reviewsaboutvendor/READ_REVIEWRECORD_SUCCESS'
const READ_REVIEWRECORD_ERROR = 'reviewsaboutvendor/READ_REVIEWRECORD_ERROR'

function getInitialState() {
  return {
    loading: false,
    error: null,
    reviews: null
  }
}

// ------------------------------------
// Actions
// ------------------------------------
const readReputationLoading = createAction(READ_REPUTATION_LOADING)
const readReputationSuccess = createAction(READ_REPUTATION_SUCCESS)
const readReputationError = createAction(READ_REPUTATION_ERROR)
const readReviewRecordLoading = createAction(READ_REVIEWRECORD_LOADING)
const readReviewRecordSuccess = createAction(READ_REVIEWRECORD_SUCCESS)
const readReviewRecordError = createAction(READ_REVIEWRECORD_ERROR)

// ------------------------------------
// Thunks
// ------------------------------------

function readReviewRecord(multihash) {
  return async dispatch => {
    try {
      dispatch(readReviewRecordLoading(multihash))
      const chluApiClient = await getChluAPIClient()
      const reviewRecord = await chluApiClient.readReviewRecord(multihash)
      dispatch(readReviewRecordSuccess({ reviewRecord, multihash }))
    } catch (error) {
      dispatch(readReviewRecordError({ multihash, error: error.message || error }))
    }
  }
}

export function readMyReputation () {
  return async (dispatch, getState) => {
    const state = getState()
    const didId = get(state, 'data.wallet.did.publicDidDocument.id', null)
    if (didId) return dispatch(readReputation(didId))
  }
}

export function readReputation (didId) {
  return async (dispatch, getState) => {
    if (didId) {
      dispatch(readReputationLoading(didId))
      try {
        // TODO: improve this and use a loading system per-review
        const chluApiClient = await getChluAPIClient()
        const list = await chluApiClient.getReviewsAboutDID(didId)
        const reviews = {}
        for (const review of list) {
          const multihash = review.multihash
          const content = get(review, 'reviewRecord', {})
          const resolved = get(content, 'resolved', false)
          // TODO: show them as loading and dispatch redux actions to resolve them
          reviews[multihash] = { multihash, loading: !resolved, error: null, ...content }
          // Only read the review if the api client did not return it resolved
          if (!resolved) dispatch(readReviewRecord(multihash))
        }
        dispatch(readReputationSuccess({ reviews, didId }))
      } catch (error) {
        console.log(error)
        dispatch(readReputationError(error.message || error))
      }
    } else {
      dispatch(readReputationError('Not logged in'))
    }
  }
}

function updateReviewRecord (reviews, multihash, data, create = true) {
  if (reviews && multihash && (create || reviews[multihash])) {
    return {
      ...reviews,
      [multihash]: Object.assign(reviews[multihash] || {}, data)
    }
  } else {
    return reviews
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [READ_REPUTATION_LOADING]: (state, { payload: didId }) => ({
    ...state,
    didId,
    loading: true
  }),
  [READ_REPUTATION_SUCCESS]: (state, { payload: { reviews, didId } }) => ({
    ...state,
    loading: didId === state.didId ? false : state.loading,
    reviews: didId === state.didId ? reviews : state.reviews
  }),
  [READ_REPUTATION_ERROR]: (state, { payload: { error, didId } }) => ({
    ...state,
    loading: didId === state.didId ? false : state.loading,
    error: didId === state.didId ? error : state.error
  }),
  [READ_REVIEWRECORD_LOADING]: (state, { payload: multihash }) => ({
    ...state,
    reviews: {
      ...updateReviewRecord(get(state, 'reviews', {}), multihash, { loading: true, multihash })
    }
  }),
  [READ_REVIEWRECORD_SUCCESS]: (state, { payload: { reviewRecord, multihash } }) => ({
    ...state,
    reviews: {
      ...updateReviewRecord(get(state, 'reviews', {}), multihash, Object.assign({}, reviewRecord, { loading: false }))
    }
  }),
  [READ_REVIEWRECORD_ERROR]: (state, { payload: { error, multihash } }) => ({
    ...state,
    reviews: {
      ...updateReviewRecord(
        get(state, 'reviews', {}),
        multihash,
        { error: error.message || error, loading: false, multihash }
      )
    }
  }),
  [DELETE_WALLET]: state => getInitialState()
}, getInitialState())
