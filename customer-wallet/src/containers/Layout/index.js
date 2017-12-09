import React from 'react'
import { any, func, bool, string } from 'prop-types'
// redux
import { connect } from 'react-redux'
import { toggleDrawer } from 'store/modules/ui/drawer'
import { changeUserType } from 'store/modules/data/profile'
import { toggleSwitchUserMenuShow } from 'store/modules/ui/switchUserMenu'
// libs
import ReduxToastr from 'react-redux-toastr'
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

const { circularProgressStyle, AppBarStyle } = style

const MainLayout = ({
  children,
  toggleDrawer,
  drawerOpen,
  changeUserType,
  profile,
  isSwitchUserMenuOpen,
  toggleSwitchUserMenuShow
}) => {
  const { loading, data, error } = profile
  const id = data ? data.id : 0
  const userType = data ? data.userType : ''

  return (
    <div>
      {loading ? <CircularProgress {...circularProgressStyle} /> : error
        ? 'Something went wrong'
        : <div>
          <Drawer toggleDrawer={toggleDrawer} drawerOpen={drawerOpen} />
          <AppBar
            title={<img src={chluLogo} className='navbar-logo' alt='logo' />}
            {...AppBarStyle}
            onLeftIconButtonTouchTap={toggleDrawer}
            iconElementRight={<SwitchUserMenu
              items={usersType}
              userId={id}
              userType={userType}
              isOpen={isSwitchUserMenuOpen}
              onRequestChange={toggleSwitchUserMenuShow}
              onItemClick={changeUserType}
            />}
          >
          </AppBar>
          {children}
          <ReduxToastr
            timeOut={4000}
            preventDuplicates
            position='top-right'
            transitionIn='fadeIn'
            transitionOut='fadeOut'
            newestOnTop
          />
        </div>
      }
    </div>
  )
}

MainLayout.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout)
