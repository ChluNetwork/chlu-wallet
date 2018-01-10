import { createAction, handleActions } from 'redux-actions'

// ------------------------------------
// Constants
// ------------------------------------
const TOGGLE_COMINGSOON_MODAL = 'modal/TOGGLE_COMINGSOON_MODAL'
const TOGGLE_MNEMONIC_EXISTS_MODAL = 'modal/TOGGLE_MNEMONIC_EXISTS_MODAL'

const initialState = {
  comingSoonModal: { isOpen: false },
  mnemonicExistsModal: { isOpen: false, data: null }
}

// ------------------------------------
// Actions
// ------------------------------------
export const toggleComingSoonModal = createAction(TOGGLE_COMINGSOON_MODAL)
export const toggleMnemonicExists = createAction(TOGGLE_MNEMONIC_EXISTS_MODAL)

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [TOGGLE_COMINGSOON_MODAL]: (state) => ({
    ...state,
    comingSoonModal: { isOpen: !state.comingSoonModal.isOpen }
  }),
  [TOGGLE_MNEMONIC_EXISTS_MODAL]: (state, { payload }) => ({
    ...state,
    mnemonicExistsModal: {
      isOpen: !state.mnemonicExistsModal.isOpen,
      data: payload || null
    }
  })
}, initialState)
