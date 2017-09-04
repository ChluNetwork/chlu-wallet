import React from 'react'
import PropTypes from 'prop-types'
// redux
import { connect } from 'react-redux'
import { toggleDrawer } from '../../store/modules/ui/drawer'
// components
import AppBar from 'material-ui/AppBar'
import Drawer from '../../components/Drawer'

const MainLayout = ({ children, toggleDrawer, modalOpen }) => (
  <div>
    <Drawer toggleDrawer={toggleDrawer} modalOpen={modalOpen} />
    <AppBar
      title='Chlu'
      iconClassNameRight='muidocs-icon-navigation-expand-more'
      onLeftIconButtonTouchTap={toggleDrawer}
    />
    {children}
  </div>
)

MainLayout.propTypes = {
  children: PropTypes.any,
  toggleDrawer: PropTypes.func.isRequired,
  modalOpen: PropTypes.bool
}

const mapStateToProps = state => ({
  modalOpen: state.ui.drawer.open
})

const mapDispatchToProps = dispatch => ({
  toggleDrawer: () => dispatch(toggleDrawer())
})

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout)
