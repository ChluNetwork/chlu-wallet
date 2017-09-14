import React from 'react'
import PropTypes from 'prop-types'
// redux
import { connect } from 'react-redux'
import { toggleDrawer } from 'store/modules/ui/drawer'
// libs
import ReduxToastr from 'react-redux-toastr'
// components
import AppBar from 'material-ui/AppBar'
import Drawer from 'components/Drawer/index'

const MainLayout = ({ children, toggleDrawer, drawerOpen }) => (
  <div>
    <Drawer toggleDrawer={toggleDrawer} modalOpen={drawerOpen} />
    <AppBar
      title='Chlu'
      iconClassNameRight='muidocs-icon-navigation-expand-more'
      onLeftIconButtonTouchTap={toggleDrawer}
    />
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
)

MainLayout.propTypes = {
  children: PropTypes.any,
  toggleDrawer: PropTypes.func.isRequired,
  drawerOpen: PropTypes.bool
}

const mapStateToProps = state => ({
  drawerOpen: state.ui.drawer.open
})

const mapDispatchToProps = dispatch => ({
  toggleDrawer: () => dispatch(toggleDrawer())
})

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout)
