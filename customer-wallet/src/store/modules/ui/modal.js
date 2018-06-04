import { createAction, handleActions } from 'redux-actions'

// ------------------------------------
// Constants
// ------------------------------------
const TOGGLE_COMINGSOON_MODAL = 'modal/TOGGLE_COMINGSOON_MODAL'

const initialState = {
  comingSoonModal: { isOpen: false }
}

// ------------------------------------
// Actions
// ------------------------------------
export const toggleComingSoonModal = createAction(TOGGLE_COMINGSOON_MODAL)

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [TOGGLE_COMINGSOON_MODAL]: (state) => ({
    ...state,
    comingSoonModal: { isOpen: !state.comingSoonModal.isOpen }
  })
}, initialState)
