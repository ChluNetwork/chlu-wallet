import { createAction, handleActions } from 'redux-actions'
import { getChluAPIClient } from 'helpers/chlu'
import { get } from 'lodash'
import { DELETE_WALLET } from './wallet';

// ------------------------------------
// Constants
// ------------------------------------
const READ_REVIEWS_I_WROTE_LOADING = 'reviewsiwrote/READ_REVIEWS_I_WROTE_LOADING'
const READ_REVIEWS_I_WROTE_SUCCESS= 'reviewsiwrote/READ_REVIEWS_I_WROTE_SUCCESS'
const READ_REVIEWS_I_WROTE_ERROR = 'reviewsiwrote/READ_REVIEWS_I_WROTE__ERROR'
const ITEMS_PER_PAGE = 5

function getInitialState() {
  return {
    loading: false,
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
const readReviewsIWroteLoading = createAction(READ_REVIEWS_I_WROTE_LOADING)
const readReviewsIWroteSuccess = createAction(READ_REVIEWS_I_WROTE_SUCCESS)
const readReviewsIWroteError = createAction(READ_REVIEWS_I_WROTE_ERROR)

// ------------------------------------
// Thunks
// ------------------------------------

export function readReviewsIWrote (firstPage = true) {
  return async (dispatch, getState) => {
    const state = getState()
    const didId = get(state, 'data.wallet.did.publicDidDocument.id', null)
    if (didId) {
      try {
        const page = get(state, 'data.reviewsIWrote.page', 0)
        dispatch(readReviewsIWroteLoading({ loadingPage: page }))
        const chluApiClient = await getChluAPIClient()
        const limit = ITEMS_PER_PAGE
        const offset = firstPage ? 0 : page * ITEMS_PER_PAGE
        const { count, rows } = await chluApiClient.getReviewsWrittenByDID(didId, offset, limit, {
          resolveProfiles: true
        })
        const canLoadMore = count > offset + rows.length
        const reviews = rows.map(review => {
          const multihash = review.multihash
          const content = get(review, 'reviewRecord', {})
          return { ...content, multihash, editable: true }
        })
        dispatch(readReviewsIWroteSuccess({ reviews, count, canLoadMore }))
      } catch (error) {
        console.log(error)
        dispatch(readReviewsIWroteError(error.message || error))
      }
    } else {
      dispatch(readReviewsIWroteError('Not logged in'))
    }
  }
}


// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [READ_REVIEWS_I_WROTE_LOADING]: (state, { payload: { loadingPage } }) => ({
    ...state,
    loading: true,
    loadingPage,
    count: loadingPage === 0 ? 0 : state.count,
    canLoadMore: false
  }),
  [READ_REVIEWS_I_WROTE_SUCCESS]: (state, { payload: { reviews, count, canLoadMore } }) => ({
    ...state,
    loading: false,
    reviews: state.loadingPage === 0 ? reviews : state.reviews.concat(reviews),
    count,
    canLoadMore,
    page: canLoadMore ? state.page + 1 : state.page
  }),
  [READ_REVIEWS_I_WROTE_ERROR]: (state, { payload: error }) => ({
    ...state,
    loading: false,
    error
  }),
  [DELETE_WALLET]: state => getInitialState()
}, getInitialState())
