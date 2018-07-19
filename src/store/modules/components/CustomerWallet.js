import { createAction, handleActions } from 'redux-actions'
import { SET_PAYMENT_SUCCESS } from 'store/modules/data/payment'

// ------------------------------------
// Constants
// ------------------------------------
const SET_RATING = 'customerWallet/SET_RATING'

const getInitialState = () => ({
  rating: 0
})

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
  }),
  [SET_PAYMENT_SUCCESS]: getInitialState
}, getInitialState())
