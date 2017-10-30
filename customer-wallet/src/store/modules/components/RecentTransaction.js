import { createAction, handleActions } from 'redux-actions'

// ------------------------------------
// Constants
// ------------------------------------
const SET_RATING = 'recentTransaction/SET_RATING'

const initialState = {
  rating: 0
}

// ------------------------------------
// Actions
// ------------------------------------
export const setRatingRecentTransaction = createAction(SET_RATING)

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [SET_RATING]: (state, { payload: rating }) => ({
    ...state,
    rating
  })
}, initialState)
