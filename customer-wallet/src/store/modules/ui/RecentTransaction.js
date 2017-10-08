import { createAction, handleActions } from 'redux-actions'

// ------------------------------------
// Constants
// ------------------------------------
const TOGGLE_SHOW_EDIT_FORM = 'recentTransaction/TOGGLE_EDIT_FORM_SHOW'

const initialState = {
  isEditFormOpen: false
}

// ------------------------------------
// Actions
// ------------------------------------
export const IsShowEditForm = createAction(TOGGLE_SHOW_EDIT_FORM)

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [TOGGLE_SHOW_EDIT_FORM]: (state, { payload: isEditFormOpen }) => ({
    ...state,
    isEditFormOpen
  })
}, initialState)
