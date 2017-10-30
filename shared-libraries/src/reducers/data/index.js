import { combineReducers } from 'redux'
// reducers
import vendorWallet from './vendorWallet'
import payment from './payment'
import fxRates from './fxRates'
import profile from './profile'
import checkout from './checkout'
import transactionHistory from './transactionHistory'
import reviews from './reviews'

export default combineReducers({
  vendorWallet,
  payment,
  fxRates,
  profile,
  checkout,
  transactionHistory,
  reviews
})
