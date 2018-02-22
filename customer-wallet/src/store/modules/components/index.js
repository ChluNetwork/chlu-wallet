import { combineReducers } from 'redux'
// reducers
import customerWallet from './CustomerWallet'
import createWallet from './CreateWallet'

export default combineReducers({
  customerWallet,
  createWallet
})
