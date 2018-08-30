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
const itemsPerPage = 5

function getInitialState() {
  return {
    loading: false,
    error: null,
    reviews: null,
    page: 0
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

export function readReputation (didId, firstPage = true) {
  return async (dispatch, getState) => {
    if (didId) {
      dispatch(readReputationLoading(didId))
      try {
        const state = getState()
        const prevDidid = get(state, 'data.reputation.didId')
        const didChanged = !prevDidid || didId !== prevDidid
        const page = get(state, 'data.reputation.page', 0)
        const myDidId = get(state, 'data.wallet.did.publicDidDocument.id', null)
        const chluApiClient = await getChluAPIClient()
        const limit = itemsPerPage
        const offset = firstPage || didChanged ? 0 : page * itemsPerPage
        let reviews = await chluApiClient.getReviewsAboutDID(didId, offset, limit)
        const isEmpty = reviews.length === 0
        reviews = reviews.map(review => {
          const multihash = review.multihash
          const content = get(review, 'reviewRecord', {})
          const customerDidId = get(review, 'reviewRecord.customer_signature.creator', null)
          const editable = customerDidId && myDidId && myDidId === customerDidId
          return { multihash, loading: false, error: null, ...content, editable }
        })
        const newPage = firstPage ? 0 : (isEmpty ? page : page + 1)
        dispatch(readReputationSuccess({ reviews, didId, page: newPage }))
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
  [READ_REPUTATION_SUCCESS]: (state, { payload: { reviews, didId, page } }) => ({
    ...state,
    loading: didId === state.didId ? false : state.loading,
    reviews: didId === state.didId ? (page > 0 ? (state.reviews || []).concat(reviews) : reviews) : state.reviews,
    page: didId === state.didId ? page : state.page
  }),
  [READ_REPUTATION_ERROR]: (state, { payload: { error, didId } }) => ({
    ...state,
    loading: didId === state.didId ? false : state.loading,
    error: didId === state.didId ? error : state.error
  }),
  [DELETE_WALLET]: state => getInitialState()
}, getInitialState())
