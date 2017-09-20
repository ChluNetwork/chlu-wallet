import { combineReducers } from 'redux'
// reducers
import vendorWallet from './vendorWallet'
import payment from './payment'
import fxRates from './fxRates'

export default combineReducers({
  vendorWallet,
  payment,
  fxRates
})
