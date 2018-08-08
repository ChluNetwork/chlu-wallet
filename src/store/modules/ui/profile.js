import { createAction, handleActions } from 'redux-actions'

// ------------------------------------
// Constants
// ------------------------------------
const TOGGLE_SEARCH_SHOW = 'TOGGLE_SEARCH_SHOW'

const initialState = {
  isSearchFieldOpen: false
}

// ------------------------------------
// Actions
// ------------------------------------
export const toggleSearchShow = createAction(TOGGLE_SEARCH_SHOW)

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [TOGGLE_SEARCH_SHOW]: state => ({
    ...state,
    isSearchFieldOpen: !state.isSearchFieldOpen
  })
}, initialState)
