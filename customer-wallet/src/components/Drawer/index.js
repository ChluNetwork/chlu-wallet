import React from 'react'
import PropTypes from 'prop-types'
// redux
import { connect } from 'react-redux'
// components
import { Link } from 'react-router'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
// styles
import './styles.css'
// data
import { linksForCustomer, linksForVendor } from 'fixtures/links'

const style = {
  color: 'inherit',
  background: 'inherit'
}

const DrawerComponent = ({ toggleDrawer, drawerOpen, profile }) => {
  const { data: { userType } } = profile
  const links = userType === 'customer' ? linksForCustomer : linksForVendor

  return (
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
}

DrawerComponent.propTypes = {
  toggleDrawer: PropTypes.func.isRequired,
  drawerOpen: PropTypes.bool
}

const mapStateToProps = state => ({
  profile: state.data.profile
})

export default connect(mapStateToProps)(DrawerComponent)
