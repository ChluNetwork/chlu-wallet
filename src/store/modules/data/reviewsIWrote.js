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

function getInitialState() {
  return {
    loading: false,
    error: null,
    reviews: []
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

export function readReviewsIWrote () {
  return async (dispatch, getState) => {
    const state = getState()
    const didId = get(state, 'data.wallet.did.publicDidDocument.id', null)
    if (didId) {
      dispatch(readReviewsIWroteLoading())
      try {
        const chluApiClient = await getChluAPIClient()
        // TODO: pagination and refactor using changes made in reputation redux module
        const { count, rows } = await chluApiClient.getReviewsWrittenByDID(didId, 0, 20)
        const reviews = {}
        for (const review of rows) {
          const multihash = review.multihash
          const content = get(review, 'reviewRecord', {})
          const resolved = get(content, 'resolved', false)
          const preparedContent = { ...content, editable: true }
          reviews[multihash] = { multihash, loading: !resolved, error: null, ...preparedContent }
        }
        dispatch(readReviewsIWroteSuccess({ reviews, count }))
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
  [READ_REVIEWS_I_WROTE_LOADING]: state => ({
    ...state,
    loading: true
  }),
  [READ_REVIEWS_I_WROTE_SUCCESS]: (state, { payload: { reviews } }) => ({
    ...state,
    loading: false,
    reviews
  }),
  [READ_REVIEWS_I_WROTE_ERROR]: (state, { payload: error }) => ({
    ...state,
    loading: false,
    error
  }),
  [DELETE_WALLET]: state => getInitialState()
}, getInitialState())
