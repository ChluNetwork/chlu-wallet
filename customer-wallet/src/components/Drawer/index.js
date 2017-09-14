import React from 'react'
import PropTypes from 'prop-types'
// components
import { Link } from 'react-router'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
// styles
import './styles.css'

const links = [
  { label: 'Checkout', href: '/checkout' },
  { label: 'Customer Wallet', href: '/' },
  { label: 'Vendor Profile', href: '/profile' }
]

const DrawerComponent = ({ toggleDrawer, drawerOpen }) => (
  <Drawer
    onRequestChange={toggleDrawer}
    open={drawerOpen}
    docked={false}>
    {links.map(({ label, href }, idx) => (
      <MenuItem key={idx}>
        <Link to={href} className='drawer-link'>
          {label}
        </Link>
      </MenuItem>
    ))}
  </Drawer>
)

DrawerComponent.propTypes = {
  toggleDrawer: PropTypes.func.isRequired,
  drawerOpen: PropTypes.bool
}

export default DrawerComponent
