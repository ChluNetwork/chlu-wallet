import { combineReducers } from 'redux';
// reducers
import comingSoonModal from './comingSoonModal'
import drawer from './drawer'
import switchUserMenu from './switchUserMenu'

export default combineReducers({
  comingSoonModal,
  drawer,
  switchUserMenu
})
