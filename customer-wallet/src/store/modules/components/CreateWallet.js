import { createAction, handleActions } from 'redux-actions'
import { generateNewWallet } from 'helpers/wallet'

// ------------------------------------
// Constants
// ------------------------------------
const CREATE_WALLET = 'createWallet/CREATE_WALLET'
const SET_WALLET_SAVED = 'createWallet/SET_WALLET_SAVED'
const RESET_WALLET = 'createWallet/RESET_WALLET'

function getInitialState() {
  return {
    walletSaved: false,
    walletCreated: null
  }
}

// ------------------------------------
// Actions
// ------------------------------------
export const createWallet = createAction(CREATE_WALLET)
export const setWalletSaved = createAction(SET_WALLET_SAVED)
export const resetWallet = createAction(RESET_WALLET)

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [CREATE_WALLET]: (state, { payload }) => ({
    ...state,
    walletCreated: generateNewWallet() 
  }),
  [SET_WALLET_SAVED]: (state, { payload }) => ({
    ...state,
    walletSaved: payload
  }),
  [RESET_WALLET]: state => getInitialState()
}, getInitialState())
