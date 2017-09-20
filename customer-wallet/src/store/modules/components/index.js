import { combineReducers } from 'redux'
// reducers
import checkout from './Checkout'
import customerWallet from './CustomerWallet'

export default combineReducers({
  checkout,
  customerWallet
})
