import { createAction, handleActions } from 'redux-actions';

// ------------------------------------
// Constants
// ------------------------------------
const TOGGLE_COMING_SOON = 'auth/SET_AUTHORIZED_DATA';

const initialState = {
  open: false
};

// ------------------------------------
// Actions
// ------------------------------------
export const toggleComingSoonModal = createAction(TOGGLE_COMING_SOON);

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [TOGGLE_COMING_SOON]: (state, action) => ({
    ...state,
    open: !state.open
  })
}, initialState);
