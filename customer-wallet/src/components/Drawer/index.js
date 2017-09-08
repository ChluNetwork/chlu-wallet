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

const DrawerComponent = ({ toggleDrawer, modalOpen }) => (
  <Drawer
    onRequestChange={toggleDrawer}
    open={modalOpen}
    docked={false}>
    {links.map(({ label, href }) => (
      <MenuItem>
        <Link to={href} className='drawer-link'>
          {label}
        </Link>
      </MenuItem>
    ))}
  </Drawer>
)

DrawerComponent.propTypes = {
  toggleDrawer: PropTypes.func.isRequired,
  modalOpen: PropTypes.bool
}

export default DrawerComponent
