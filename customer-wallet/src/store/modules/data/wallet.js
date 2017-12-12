import { createAction, handleActions } from 'redux-actions'

// ------------------------------------
// Constants
// ------------------------------------
const SET_MNEMONIC = 'wallet/SET_MNEMONIC'
const GENERATE_MNEMONIC = 'wallet/GENERATE_MNEMONIC'

const initialState = {
  mnemonic: localStorage.getItem('mnemonic_key'),
  createWallet: {
    mnemonic: null
  }
}

// ------------------------------------
// Actions
// ------------------------------------
export const setMnemonic = createAction(SET_MNEMONIC)
export const setCreateMnemonic = createAction(GENERATE_MNEMONIC)
// ------------------------------------
// Thunks
// ------------------------------------

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [SET_MNEMONIC]: (state, { payload }) => {
    localStorage.setItem('mnemonic_key', payload)
    return { ...state, mnemonic: payload }
  },
  [GENERATE_MNEMONIC]: (state, { payload }) => ({
    ...state,
    createWallet: {
      mnemonic: payload
    }
  })
}, initialState)
