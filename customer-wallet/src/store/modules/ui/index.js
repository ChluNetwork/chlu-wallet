import { combineReducers } from 'redux';
// reducers
import comingSoonModal from './comingSoonModal'
import drawer from './drawer'
import switchUserMenu from './switchUserMenu'
import profile from './profile'
import recentTransaction from './RecentTransaction'

export default combineReducers({
  comingSoonModal,
  drawer,
  switchUserMenu,
  profile,
  recentTransaction
})
