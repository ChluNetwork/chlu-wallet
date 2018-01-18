import { createAction, handleActions } from 'redux-actions'

// ------------------------------------
// Constants
// ------------------------------------
const SET_WALLET_CREATED = 'createWalletState/SET_WALLET_CREATED'
const SET_SAVE_MNEMONIC = 'createWalletState/SET_SAVE_MNEMONIC'

const initialState = {
  mnemonicSaved: false,
  walletCreated: false
}

// ------------------------------------
// Actions
// ------------------------------------
export const setWalletCreated = createAction(SET_WALLET_CREATED)
export const setSaveMnemonic = createAction(SET_SAVE_MNEMONIC)

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [SET_WALLET_CREATED]: (state, { payload }) => ({
    ...state,
    walletCreated: payload
  }),
  [SET_SAVE_MNEMONIC]: (state, { payload }) => ({
    ...state,
    mnemonicSaved: payload
  })
}, initialState)
