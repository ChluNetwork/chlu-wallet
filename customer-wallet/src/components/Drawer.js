import React from 'react'
import PropTypes from 'prop-types'
// components
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'

const DrawerComponent = ({ toggleDrawer, modalOpen }) => (
  <Drawer
    onRequestChange={toggleDrawer}
    open={modalOpen}
    docked={false}>
    <MenuItem>Checkout</MenuItem>
    <MenuItem>Customer Wallet</MenuItem>
    <MenuItem>Vendor Profile</MenuItem>
  </Drawer>
)

DrawerComponent.propTypes = {
  toggleDrawer: PropTypes.func.isRequired,
  modalOpen: PropTypes.bool
}

export default DrawerComponent
