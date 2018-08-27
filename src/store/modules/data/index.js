import { combineReducers } from 'redux'
// reducers
import payment from './payment'
import reputation from './reputation'
import crawler from './crawler'
import fxRates from './fxRates'
import checkout from './checkout'
import transactions from './transactions'
import reviews from './reviews'
import wallet from './wallet'
import search from './search'

export default combineReducers({
  payment,
  reputation,
  crawler,
  fxRates,
  checkout,
  transactions,
  reviews,
  wallet,
  search
})
