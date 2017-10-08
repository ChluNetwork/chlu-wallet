import { combineReducers } from 'redux'
// reducers
import customerWallet from './CustomerWallet'
import recentTransaction from './RecentTransaction'

export default combineReducers({
  customerWallet,
  recentTransaction
})
