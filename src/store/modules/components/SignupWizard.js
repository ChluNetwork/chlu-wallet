import { createAction, handleActions } from 'redux-actions'

// ------------------------------------
// Constants
// ------------------------------------
const SET_ACCEPTED_TERMS = 'customerWallet/SET_ACCEPTED_TERMS'

const initialState = {
  acceptedTerms: false
}

// ------------------------------------
// Actions
// ------------------------------------
export const setAcceptTermsAndConditions = createAction(SET_ACCEPTED_TERMS)

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [SET_ACCEPTED_TERMS]: (state, { payload: acceptedTerms }) => ({
    ...state,
    acceptedTerms
  })
}, initialState)
