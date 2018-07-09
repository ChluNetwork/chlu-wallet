import { createAction, handleActions } from 'redux-actions'
import { getChluIPFS } from 'helpers/ipfs'
import { get } from 'lodash'
import { DELETE_WALLET } from './wallet';
// ------------------------------------
// Constants
// ------------------------------------
const READ_REPUTATION_LOADING = 'READ_REPUTATION_LOADING'
const READ_REPUTATION_SUCCESS = 'READ_REPUTATION_SUCCESS'
const READ_REPUTATION_ERROR = 'READ_REPUTATION_ERROR'
const READ_REVIEWRECORD_LOADING = 'reviewsaboutme/READ_REVIEWRECORD_LOADING'
const READ_REVIEWRECORD_SUCCESS = 'reviewsaboutme/READ_REVIEWRECORD_SUCCESS'
const READ_REVIEWRECORD_ERROR = 'reviewsaboutme/READ_REVIEWRECORD_ERROR'
const UPDATE_REVIEW_RECORD = 'UPDATE_REVIEW_RECORD'

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
      const chluIpfs = await getChluIPFS()
      const reviewRecord = await chluIpfs.readReviewRecord(multihash, {
        getLatestVersion: true,
        // TODO: check for updates
      })
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
    if (didId) {
      dispatch(readReputationLoading())
      try {
        // TODO: improve this and use a loading system per-review
        const chluIpfs = await getChluIPFS()
        const multihashes = await chluIpfs.getReviewsByDID(didId)
        const reviews = {}
        for (const multihash of multihashes) {
            // TODO: show them as loading and dispatch redux actions to resolve them
            reviews[multihash] = { multihash, loading: true, error: null }
            dispatch(readReviewRecord(multihash))
        }
        dispatch(readReputationSuccess(reviews))
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
  [READ_REPUTATION_LOADING]: state => ({
    ...state,
    loading: true
  }),
  [READ_REPUTATION_SUCCESS]: (state, { payload: reviews }) => ({
    ...state,
    loading: false,
    reviews: reviews
  }),
  [READ_REPUTATION_ERROR]: (state, { payload: error }) => ({
    ...state,
    loading: false,
    error 
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
  [UPDATE_REVIEW_RECORD]: (state, { payload: { multihash, newMultihash, reviewRecord } }) => ({
    ...state,
    reviews: {
      ...updateReviewRecord(get(state, 'reviews', {}), multihash, {
        ...reviewRecord,
        updatedMultihash: newMultihash
      }, false)
    }
  }),
  [DELETE_WALLET]: state => getInitialState()
}, getInitialState())
