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
    loadingPage: null,
    error: null,
    reviews: null,
    page: 0,
    count: 0,
    canLoadMore: false
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

export function readMyReputation (firstPage = true) {
  return async (dispatch, getState) => {
    const state = getState()
    const didId = get(state, 'data.wallet.did.publicDidDocument.id', null)
    if (didId) return dispatch(readReputation(didId, firstPage))
  }
}

export function readReputation (didId, firstPage = true) {
  return async (dispatch, getState) => {
    if (didId) {
      try {
        const state = getState()
        const page = get(state, 'data.reputation.page', 0)
        dispatch(readReputationLoading({ didId, loadingPage: page }))
        const prevDidid = get(state, 'data.reputation.didId')
        const didChanged = !prevDidid || didId !== prevDidid
        const myDidId = get(state, 'data.wallet.did.publicDidDocument.id', null)
        const chluApiClient = await getChluAPIClient()
        const limit = itemsPerPage
        const offset = firstPage || didChanged ? 0 : page * itemsPerPage
        const { count, rows } = await chluApiClient.getReviewsAboutDID(didId, offset, limit)
        const canLoadMore = count > offset + rows.length
        const reviews = rows.map(review => {
          const multihash = review.multihash
          const content = get(review, 'reviewRecord', {})
          const customerDidId = get(review, 'reviewRecord.customer_signature.creator', null)
          const editable = customerDidId && myDidId && myDidId === customerDidId
          return { multihash, loading: false, error: null, ...content, editable }
        })
        dispatch(readReputationSuccess({ reviews, didId, count, canLoadMore }))
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
  [READ_REPUTATION_LOADING]: (state, { payload: { didId, loadingPage } }) => ({
    ...state,
    didId,
    loading: true,
    loadingPage,
    page: didId === state.didId ? state.page : 0,
    count: didId === state.didId ? state.count : 0,
    reviews: didId === state.didId ? state.reviews : null,
    canLoadMore: didId === state.didId ? state.canLoadMore : false
  }),
  [READ_REPUTATION_SUCCESS]: (state, { payload: { reviews, didId, count, canLoadMore } }) => ({
    ...state,
    loading: didId === state.didId ? false : state.loading,
    reviews: didId === state.didId && state.page > 0 ? (state.reviews || []).concat(reviews) : reviews,
    page: didId === state.didId && canLoadMore ? state.page + 1 : state.page,
    count: didId === state.didId ? count : state.count,
    canLoadMore
  }),
  [READ_REPUTATION_ERROR]: (state, { payload: { error, didId } }) => ({
    ...state,
    loading: didId === state.didId ? false : state.loading,
    error: didId === state.didId ? error : state.error
  }),
  [DELETE_WALLET]: state => getInitialState()
}, getInitialState())
