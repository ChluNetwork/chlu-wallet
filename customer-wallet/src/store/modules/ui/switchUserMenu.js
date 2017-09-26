import { createAction, handleActions } from 'redux-actions'

// ------------------------------------
// Constants
// ------------------------------------
const TOGGLE_SWITCH_USER_MENU_SHOW = 'TOGGLE_SWITCH_USER_MENU_SHOW'

const initialState = {
  isOpen: false
}

// ------------------------------------
// Actions
// ------------------------------------
export const toggleSwitchUserMenuShow = createAction(TOGGLE_SWITCH_USER_MENU_SHOW)

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [TOGGLE_SWITCH_USER_MENU_SHOW]: state => ({
    ...state,
    isOpen: !state.isOpen
  })
}, initialState)
