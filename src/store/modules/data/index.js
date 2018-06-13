import { combineReducers } from 'redux'
// reducers
import payment from './payment'
import crawler from './crawler'
import fxRates from './fxRates'
import checkout from './checkout'
import transactions from './transactions'
import reviews from './reviews'
import wallet from './wallet'

export default combineReducers({
  payment,
  crawler,
  fxRates,
  checkout,
  transactions,
  reviews,
  wallet
})
