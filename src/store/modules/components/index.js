import { combineReducers } from 'redux'
// reducers
import customerWallet from './CustomerWallet'
import createWallet from './CreateWallet'
import signupWizard from './SignupWizard'

export default combineReducers({
  customerWallet,
  createWallet,
  signupWizard
})
