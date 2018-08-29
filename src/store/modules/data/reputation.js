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

// ------------------------------------
// Thunks
// ------------------------------------

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
        const myDidId = get(getState(), 'data.wallet.did.publicDidDocument.id', null)
        const chluApiClient = await getChluAPIClient()
        const list = await chluApiClient.getReviewsAboutDID(didId)
        const reviews = {}
        for (const review of list) {
          const multihash = review.multihash
          const content = get(review, 'reviewRecord', {})
          const customerDidId = get(review, 'reviewRecord.customer_signature.creator', null)
          const editable = customerDidId && myDidId && myDidId === customerDidId
          const resolved = get(content, 'resolved', false)
          const preparedContent = { ...content, editable }
          reviews[multihash] = { multihash, loading: !resolved, error: null, ...preparedContent }
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
  [DELETE_WALLET]: state => getInitialState()
}, getInitialState())
