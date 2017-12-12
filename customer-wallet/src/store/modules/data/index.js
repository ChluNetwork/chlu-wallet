import { combineReducers } from 'redux'
// reducers
import payment from './payment'
import fxRates from './fxRates'
import profile from './profile'
import checkout from './checkout'
import customerTransactions from './customerTransactions'
import vendorTransaction from './vendorTransactions'
import reviews from './reviews'
import wallet from './wallet'

export default combineReducers({
  payment,
  fxRates,
  profile,
  checkout,
  customerTransactions,
  vendorTransaction,
  reviews,
  wallet
})
