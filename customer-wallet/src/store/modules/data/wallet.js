import { createAction, handleActions } from 'redux-actions'
import { getWalletFromLocalStorage, deleteWalletFromLocalStorage, getAddress } from 'helpers/wallet'

// ------------------------------------
// Constants
// ------------------------------------
const SET_WALLET = 'wallet/SET'
const DELETE_WALLET = 'wallet/DELETE'
const OPEN_DELETE_MODAL = 'wallet/OPEN_DELETE_MODAL'
const CLOSE_DELETE_MODAL = 'wallet/CLOSE_DELETE_MODAL'

function getInitialState() {
  return {
    isDeleteModalOpen: false,
    testnet: null,
    bitcoinMnemonic: null,
    did: null
  }
}

function load() {
  return Object.assign(getInitialState(), getWalletFromLocalStorage())
}

// ------------------------------------
// Actions
// ------------------------------------
export const setWallet = createAction(SET_WALLET)
export const closeDeleteModal = createAction(CLOSE_DELETE_MODAL)
export const openDeleteModal = createAction(OPEN_DELETE_MODAL)
const deleteReduxWallet = createAction(DELETE_WALLET)
// ------------------------------------
// Thunks
// ------------------------------------
export function deleteWallet() {
  return dispatch => {
    deleteWalletFromLocalStorage()
    dispatch(deleteReduxWallet())
  }
}
// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [SET_WALLET]: (state, { payload: wallet }) => {
    return { ...wallet, isDeleteModalOpen: false, address: getAddress(wallet) }
  },
  [CLOSE_DELETE_MODAL]: state => ({ ...state, isDeleteModalOpen: false }),
  [OPEN_DELETE_MODAL]: state => ({ ...state, isDeleteModalOpen: true }),
  [DELETE_WALLET]: state => getInitialState()
}, load())
