import React from 'react'
import PropTypes from 'prop-types'
// components
import { Link } from 'react-router'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
// styles
import './styles.css'

const links = [
  { label: 'Checkout', href: '/customer/checkout' },
  { label: 'Customer Wallet', href: '/customer/wallet' },
  { label: 'Vendor Profile', href: '/vendor/profile' },
  { label: 'Vendor Wallet', href: '/vendor/wallet' }
]

const style = {
  color: 'inherit',
  background: 'inherit'
}

const DrawerComponent = ({ toggleDrawer, drawerOpen }) => (
  <Drawer
    onRequestChange={toggleDrawer}
    open={drawerOpen}
    docked={false}>
    {links.map(({ label, href }, idx) => (
      <Link
        to={href}
        className='drawer-link'
        activeClassName='drawer-link-active'
        key={idx}
        onClick={toggleDrawer}
      >
        <MenuItem style={style} >
          {label}
        </MenuItem>
      </Link>
    ))}
  </Drawer>
)

DrawerComponent.propTypes = {
  toggleDrawer: PropTypes.func.isRequired,
  drawerOpen: PropTypes.bool
}

export default DrawerComponent
