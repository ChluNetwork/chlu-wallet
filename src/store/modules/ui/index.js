import { combineReducers } from 'redux';
// reducers
import modal from './modal'
import drawer from './drawer'
import profile from './profile'

export default combineReducers({
  modal,
  drawer,
  profile
})
