import React from 'react'
import PropTypes from 'prop-types'
// redux
import { connect } from 'react-redux'
import { toggleDrawer } from 'store/modules/ui/drawer'
import { actions } from 'shared-libraries/lib'
import { toggleSwitchUserMenuShow } from 'store/modules/ui/switchUserMenu'
// libs
import ReduxToastr from 'react-redux-toastr'
// components
import AppBar from 'material-ui/AppBar'
import Drawer from 'components/Drawer'
import CircularProgress from 'material-ui/CircularProgress'
import SwitchUserMenu from './SwitchUserMenu'
// data
import usersType from 'shared-libraries/lib/fixtures/usersType'
// styles
import { mainColor } from 'styles/constants'
// constants
const { dataActions: { profile: { changeUserType } } } = actions

const CircularProgressStyle = {
  margin: '20px auto'
}

const AppBarStyle = {
  background: mainColor
}

const AppBarTitleStyle = {
  textAlign: 'center',
  textTransform: 'uppercase'
}


const MainLayout = ({
  children,
  toggleDrawer,
  drawerOpen,
  changeUserType,
  profile,
  isSwitchUserMenuOpen,
  toggleSwitchUserMenuShow
}) => {
  const { loading } = profile

  return (
    <div>
      {loading
        ? <CircularProgress style={CircularProgressStyle} />
        : <div>
          <Drawer toggleDrawer={toggleDrawer} drawerOpen={drawerOpen} />
          <AppBar
            title='Chlu'
            style={AppBarStyle}
            titleStyle={AppBarTitleStyle}
            onLeftIconButtonTouchTap={toggleDrawer}
            iconElementRight={<SwitchUserMenu
              items={usersType}
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
  children: PropTypes.any,
  toggleDrawer: PropTypes.func.isRequired,
  drawerOpen: PropTypes.bool,
  changeUserType: PropTypes.func,
  userType: PropTypes.string,
  isSwitchUserMenuOpen: PropTypes.bool,
  toggleSwitchUserMenuShow: PropTypes.func
}

const mapStateToProps = state => ({
  drawerOpen: state.ui.drawer.open,
  profile: state.data.profile,
  isSwitchUserMenuOpen: state.ui.switchUserMenu.isOpen
})

const mapDispatchToProps = dispatch => ({
  toggleDrawer: () => dispatch(toggleDrawer()),
  changeUserType: data => dispatch(changeUserType(data)),
  toggleSwitchUserMenuShow: () => dispatch(toggleSwitchUserMenuShow())
})

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout)
