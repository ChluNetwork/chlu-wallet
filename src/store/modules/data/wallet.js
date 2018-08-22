import { createAction, handleActions } from 'redux-actions'
import {
  getWalletFromLocalStorage,
  deleteWalletFromLocalStorage,
  saveWalletToLocalStorage,
  getAddress,
  importDID,
  deleteDID
} from 'helpers/wallet'
import getBlockchainClient from 'chlu-wallet-support-js/lib/blockchain_client.js'

// ------------------------------------
// Constants
// ------------------------------------
export const SET_WALLET = 'wallet/SET'
export const DELETE_WALLET = 'wallet/DELETE'
const OPEN_DELETE_MODAL = 'wallet/OPEN_DELETE_MODAL'
const CLOSE_DELETE_MODAL = 'wallet/CLOSE_DELETE_MODAL'
const FETCH_BALANCE_LOADING = 'wallet/FETCH_BALANCE_LOADING'
const FETCH_BALANCE_ERROR = 'wallet/FETCH_BALANCE_ERROR'
const FETCH_BALANCE_SUCCESS = 'wallet/FETCH_BALANCE_SUCCESS'

function getInitialState() {
  return {
    isDeleteModalOpen: false,
    testnet: null,
    bitcoinMnemonic: null,
    did: null,
    loading: false,
    error: null,
    balance: null
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
const fetchBalanceLoading = createAction(FETCH_BALANCE_LOADING)
const fetchBalanceSuccess = createAction(FETCH_BALANCE_SUCCESS)
const fetchBalanceError = createAction(FETCH_BALANCE_ERROR)
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
    dispatch(fetchBalance())
  }
}

export function setWalletToCreatedWallet() {
  return async (dispatch, getState) => {
    const createdWallet = getState().components.createWallet.walletCreated
    await dispatch(setWallet(createdWallet))
  }
}

export function fetchBalance() {
  return async (dispatch, getState) => {
    try {
      dispatch(fetchBalanceLoading())
      const state = getState()
      const wallet = state.data.wallet
      const address = getAddress(wallet)
      const blockchain = getBlockchainClient(process.env.REACT_APP_BLOCKCYPHER_TOKEN)
      const data = await new Promise((resolve, reject) => {
        blockchain.getAddrBal(address, (err, res) => err ? reject(err) : resolve(res))
      })
      dispatch(fetchBalanceSuccess(data))
    } catch (error) {
      dispatch(fetchBalanceError(error.message || error))
    }
  }
}
// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  // Wallet
  [SET_WALLET]: (state, { payload: wallet }) => {
    return { ...getInitialState(), ...wallet, address: getAddress(wallet) }
  },
  [DELETE_WALLET]: state => getInitialState(),
  // Balance
  [FETCH_BALANCE_LOADING]: state => ({ ...state, loading: true, balance: null, error: null }),
  [FETCH_BALANCE_SUCCESS]: (state, { payload: balance }) => ({ ...state, loading: false, balance }),
  [FETCH_BALANCE_ERROR]: (state, { payload: error }) => ({ ...state, loading: false, error }),
  // Modal
  [CLOSE_DELETE_MODAL]: state => ({ ...state, isDeleteModalOpen: false }),
  [OPEN_DELETE_MODAL]: state => ({ ...state, isDeleteModalOpen: true }),
}, load())
