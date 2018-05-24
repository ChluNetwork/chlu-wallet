import { createAction, handleActions } from 'redux-actions'
import ImportPrivateKey from 'chlu-wallet-support-js/lib/import_private_key'

// ------------------------------------
// Constants
// ------------------------------------
const SET_MNEMONIC = 'wallet/SET_MNEMONIC'
const GENERATE_MNEMONIC = 'wallet/GENERATE_MNEMONIC'
const UPDATE_NEW_MNEMONIC = 'wallet/UPDATE_NEW_MNEMONIC'

const initialState = {
  mnemonic: localStorage.getItem('mnemonic_key'),
  addresses: JSON.parse(localStorage.getItem('addresses')),
  createWallet: {
    mnemonic: null,
    addresses: []
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
    var keyPath = "m/44'/1'/0'/0/0"
    const importer = new ImportPrivateKey()
    const kp = importer.importFromMnemonic(payload, keyPath)
    const address = kp.getAddress()
    
    localStorage.setItem('mnemonic_key', payload)
    localStorage.setItem('addresses', JSON.stringify([address]))
    return { ...state, mnemonic: payload, addresses: JSON.stringify([address]) }
  },
  [UPDATE_NEW_MNEMONIC]: (state) => ({
    ...state,
    mnemonic: localStorage.getItem('mnemonic_key'),
    addresses: JSON.parse(localStorage.getItem('addresses'))
  }),
  [GENERATE_MNEMONIC]: (state, { payload }) => ({
    ...state,
    createWallet: {
      mnemonic: payload
    }
  })
}, initialState)
