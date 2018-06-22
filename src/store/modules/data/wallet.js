import { createAction, handleActions } from 'redux-actions'
import {
  getWalletFromLocalStorage,
  deleteWalletFromLocalStorage,
  saveWalletToLocalStorage,
  getAddress,
  importDID,
  deleteDID
} from 'helpers/wallet'
import { } from '../../../helpers/wallet';

// ------------------------------------
// Constants
// ------------------------------------
export const SET_WALLET = 'wallet/SET'
export const DELETE_WALLET = 'wallet/DELETE'
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
export const closeDeleteModal = createAction(CLOSE_DELETE_MODAL)
export const openDeleteModal = createAction(OPEN_DELETE_MODAL)
const deleteReduxWallet = createAction(DELETE_WALLET)
const setReduxWallet = createAction(SET_WALLET)
// ------------------------------------
// Thunks
// ------------------------------------
export function deleteWallet() {
  return async dispatch => {
    deleteWalletFromLocalStorage()
    await deleteDID()
    dispatch(deleteReduxWallet())
  }
}

export function setWallet(wallet) {
  return async dispatch => {
    saveWalletToLocalStorage(wallet)
    await importDID(wallet.did)
    dispatch(setReduxWallet(wallet))
  }
}

export function setWalletToCreatedWallet() {
  return async (dispatch, getState) => {
    const createdWallet = getState().components.createWallet.walletCreated
    await dispatch(setWallet(createdWallet))
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
