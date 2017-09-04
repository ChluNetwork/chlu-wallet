import { combineReducers } from 'redux';
// reducers
import comingSoonModal from './comingSoonModal'
import drawer from './drawer'

export default combineReducers({
  comingSoonModal,
  drawer
})
