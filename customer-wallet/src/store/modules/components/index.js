import { combineReducers } from 'redux'
// reducers
import customerWallet from './CustomerWallet'
import recentTransaction from './RecentTransaction'
import createWallet from './CreateWallet'

export default combineReducers({
  customerWallet,
  recentTransaction,
  createWallet
})
