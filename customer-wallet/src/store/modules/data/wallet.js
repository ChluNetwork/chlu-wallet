import { createAction, handleActions } from 'redux-actions'

// ------------------------------------
// Constants
// ------------------------------------
const SET_MNEMONIC = 'wallet/SET_MNEMONIC'
const GENERATE_MNEMONIC = 'wallet/GENERATE_MNEMONIC'
const UPDATE_NEW_MNEMONIC = 'wallet/UPDATE_NEW_MNEMONIC'

const initialState = {
  mnemonic: localStorage.getItem('mnemonic_key'),
  addresses: ['mjw2BcBvNKkgLvQyYhzRERRgWSUVG7HHTb'],
  createWallet: {
    mnemonic: null
  }
}

// ------------------------------------
// Actions
// ------------------------------------
export const setMnemonic = createAction(SET_MNEMONIC)
export const setCreateMnemonic = createAction(GENERATE_MNEMONIC)
export const updateMnemonic = createAction(UPDATE_NEW_MNEMONIC)
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
  [UPDATE_NEW_MNEMONIC]: (state) => ({
    ...state,
    mnemonic: localStorage.getItem('mnemonic_key')
  }),
  [GENERATE_MNEMONIC]: (state, { payload }) => ({
    ...state,
    createWallet: {
      mnemonic: payload
    }
  })
}, initialState)
