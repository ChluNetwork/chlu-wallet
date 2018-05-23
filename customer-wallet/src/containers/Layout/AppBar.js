import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core';
// redux
import { connect } from 'react-redux'
import { changeUserType } from 'store/modules/data/profile'
import { toggleSwitchUserMenuShow } from 'store/modules/ui/switchUserMenu'
import { toggleDrawer } from 'store/modules/ui/drawer'
// components
import SwitchUserMenu from './SwitchUserMenu'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar';
// assets
import chluLogo from 'images/svg/chlu-2.svg'
// data
import usersType from 'fixtures/usersType'

const titleStyle = {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}

function ChluAppBar({
    toggleDrawer,
    profile,
    toggleSwitchUserMenuShow,
    changeUserType,
    isSwitchUserMenuOpen,
    classes
}) {
    const { data } = profile
    const userType = data ? data.userType : ''
    return <AppBar position='static'>
        <Toolbar>
            <IconButton onClick={toggleDrawer} className={classes.menuButton} color='inherit'>
                <MenuIcon />
            </IconButton>
            <div style={titleStyle}>
                <img src={chluLogo} className='navbar-logo' alt='logo' />
            </div>
            <SwitchUserMenu
                items={usersType}
                userType={userType}
                isOpen={isSwitchUserMenuOpen}
                onRequestChange={toggleSwitchUserMenuShow}
                onItemClick={changeUserType}
            />
        </Toolbar>
    </AppBar>
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

ChluAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  toggleDrawer: PropTypes.func,
  drawerOpen: PropTypes.bool,
  changeUserType: PropTypes.func,
  isSwitchUserMenuOpen: PropTypes.bool,
  toggleSwitchUserMenuShow: PropTypes.func
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles({}) // required for classes.menuBar
)(ChluAppBar)