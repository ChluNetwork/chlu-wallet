import React from 'react'
import { any, func, bool, string } from 'prop-types'
// redux
import { connect } from 'react-redux'
import { toggleDrawer } from 'store/modules/ui/drawer'
import { changeUserType } from 'store/modules/data/profile'
import { toggleSwitchUserMenuShow } from 'store/modules/ui/switchUserMenu'
// components
import AppBar from 'material-ui/AppBar'
import Drawer from 'components/Drawer'
import CircularProgress from 'material-ui/CircularProgress'
import SwitchUserMenu from './SwitchUserMenu'
// data
import usersType from 'fixtures/usersType'
// styles
import style from 'styles/inlineStyles/containers/MainLayout'
// assets
import chluLogo from 'images/svg/chlu-2.svg'
//import marketplaceLogo from 'images/svg/apple.svg'

const { circularProgressStyle, AppBarStyle } = style

const AppLayout = ({
  children,
  toggleDrawer,
  drawerOpen,
  changeUserType,
  profile,
  isSwitchUserMenuOpen,
  toggleSwitchUserMenuShow,
  location
}) => {
  const { loading, data, error } = profile
  const userType = data ? data.userType : ''

  let logo = <img src={chluLogo} className='navbar-logo' alt='logo' />
  if ( location.pathname === "/customer/checkout" ) {
    logo = null
  }
  
  
  return (
    <div>
      {loading ? <CircularProgress {...circularProgressStyle} /> : error
        ? 'Something went wrong'
        : <div>
          <Drawer toggleDrawer={toggleDrawer} drawerOpen={drawerOpen} />
          <AppBar
            title={logo}
            {...AppBarStyle}
            onLeftIconButtonTouchTap={toggleDrawer}
            iconElementRight={<SwitchUserMenu
              items={usersType}
              userType={userType}
              isOpen={isSwitchUserMenuOpen}
              onRequestChange={toggleSwitchUserMenuShow}
              onItemClick={changeUserType}
            />}
          >
          </AppBar>
          {children}
        </div>
      }
    </div>
  )
}

AppLayout.propTypes = {
  children: any,
  toggleDrawer: func,
  drawerOpen: bool,
  changeUserType: func,
  userType: string,
  isSwitchUserMenuOpen: bool,
  toggleSwitchUserMenuShow: func
}

const mapStateToProps = state => ({
  drawerOpen: state.ui.drawer.open,
  profile: state.data.profile,
  isSwitchUserMenuOpen: state.ui.switchUserMenu.isOpen
})

const mapDispatchToProps = dispatch => ({
  toggleDrawer: () => dispatch(toggleDrawer()),
  changeUserType: (userType) => dispatch(changeUserType(userType)),
  toggleSwitchUserMenuShow: () => dispatch(toggleSwitchUserMenuShow())
})

export default connect(mapStateToProps, mapDispatchToProps)(AppLayout)
