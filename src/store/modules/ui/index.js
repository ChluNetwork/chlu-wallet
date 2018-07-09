import { combineReducers } from 'redux';
// reducers
import modal from './modal'
import drawer from './drawer'

export default combineReducers({
  modal,
  drawer,
  profile
})
