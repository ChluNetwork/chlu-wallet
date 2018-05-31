import { createAction, handleActions } from 'redux-actions'
import { getWalletFromLocalStorage, getAddress } from 'helpers/wallet'

// ------------------------------------
// Constants
// ------------------------------------
const SET_WALLET = 'wallet/SET'
const DELETE_WALLET = 'wallet/DELETE'

const initialState = getWalletFromLocalStorage()

// ------------------------------------
// Actions
// ------------------------------------
export const setWallet = createAction(SET_WALLET)
// ------------------------------------
// Thunks
// ------------------------------------

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [SET_WALLET]: (state, { payload: wallet }) => {
    return { ...wallet, address: getAddress(wallet) }
  },
  [DELETE_WALLET]: state => null
}, initialState)
