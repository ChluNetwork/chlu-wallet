import { combineReducers } from 'redux'
// reducers
import vendorWallet from './vendorWallet'
import payment from './payment'
import fxRates from './fxRates'
import profile from './profile'
import checkout from './checkout'
import transaction from './transaction'

export default combineReducers({
  vendorWallet,
  payment,
  fxRates,
  profile,
  checkout,
  transaction
})
