import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core';
// redux
import { connect } from 'react-redux'
import { changeUserType } from 'store/modules/data/profile'
import { toggleDrawer } from 'store/modules/ui/drawer'
// components
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar';
// assets
import chluLogo from 'images/svg/chlu-2.svg'

const style = {
    logo: {
        maxWidth: '150px'
    },
    title: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
}

function ChluAppBar({
    toggleDrawer,
    changeUserType,
    classes
}) {
    return <AppBar position='static'>
        <Toolbar>
            <IconButton onClick={toggleDrawer} className={classes.menuButton} color='inherit'>
                <MenuIcon />
            </IconButton>
            <div className={classes.title}>
                <img className={classes.logo} src={chluLogo} alt='logo' />
            </div>
        </Toolbar>
    </AppBar>
}

const mapStateToProps = state => ({
  drawerOpen: state.ui.drawer.open,
  profile: state.data.profile
})

const mapDispatchToProps = dispatch => ({
  toggleDrawer: () => dispatch(toggleDrawer()),
  changeUserType: (userType) => dispatch(changeUserType(userType))
})

ChluAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  toggleDrawer: PropTypes.func,
  drawerOpen: PropTypes.bool,
  changeUserType: PropTypes.func
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(style)
)(ChluAppBar)