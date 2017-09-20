import { createAction, handleActions } from 'redux-actions'

// ------------------------------------
// Constants
// ------------------------------------
const SET_RATING = 'SET_RATING'

const initialState = {
  rating: 0
}

// ------------------------------------
// Actions
// ------------------------------------
export const setRatingForCustomerWallet = createAction(SET_RATING)

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [SET_RATING]: (state, { payload: rating }) => ({
    ...state,
    rating
  })
}, initialState)
