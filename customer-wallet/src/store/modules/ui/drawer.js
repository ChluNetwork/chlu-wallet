import { createAction, handleActions } from 'redux-actions'

// ------------------------------------
// Constants
// ------------------------------------
const TOGGLE_DRAWER = 'drawer/TOGGLE_DRAWER'

const initialState = {
  open: false
}

// ------------------------------------
// Actions
// ------------------------------------
export const toggleDrawer = createAction(TOGGLE_DRAWER)

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [TOGGLE_DRAWER]: (state, action) => ({
    ...state,
    open: !state.open
  })
}, initialState)
