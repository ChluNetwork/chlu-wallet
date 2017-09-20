import { combineReducers } from 'redux'
// reducers
import vendorWallet from './vendorWallet'
import payment from './payment'

export default combineReducers({
  vendorWallet,
  payment
})
