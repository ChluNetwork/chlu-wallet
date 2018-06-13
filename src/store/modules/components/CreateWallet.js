import { createAction, handleActions } from 'redux-actions'
import { generateNewWallet } from 'helpers/wallet'

// redux form
import { submit } from 'redux-form'

// ------------------------------------
// Constants
// ------------------------------------
const CREATING_WALLET = 'createWallet/CREATING_WALLET'
const CREATED_WALLET = 'createWallet/CREATED_WALLET'
const SET_WALLET_SAVED = 'createWallet/SET_WALLET_SAVED'
const RESET_WALLET = 'createWallet/RESET_WALLET'

function getInitialState() {
  return {
    walletSaved: false,
    loading: false,
    walletCreated: null
  }
}

// ------------------------------------
// Actions
// ------------------------------------
export const setWalletSaved = createAction(SET_WALLET_SAVED)
export const resetWallet = createAction(RESET_WALLET)
const creatingWallet = createAction(CREATING_WALLET)
const createdWallet = createAction(CREATED_WALLET)

export function createWallet() {
  return async dispatch => {
    dispatch(creatingWallet())
    const wallet = await generateNewWallet()
    dispatch(createdWallet(wallet))
  }
}

export function finishClicked() {
  return async dispatch => {
    dispatch(submit('businessCrawlerForm'))
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [CREATING_WALLET]: state => ({
    ...state,
    loading: true
  }),
  [CREATING_WALLET]: state => ({
    ...state,
    loading: true
  }),
  [CREATED_WALLET]: (state, { payload }) => ({
    ...state,
    loading: false,
    walletCreated: payload
  }),
  [SET_WALLET_SAVED]: (state, { payload }) => ({
    ...state,
    walletSaved: payload
  }),
  [RESET_WALLET]: state => getInitialState()
}, getInitialState())
