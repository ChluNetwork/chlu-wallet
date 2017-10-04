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
import { linksForCustomer, linksForVendor, linksForDemonstrator } from 'shared-libraries/lib/fixtures/links'

const style = {
  color: 'inherit',
  background: 'inherit'
}

const DrawerComponent = ({ toggleDrawer, drawerOpen, userType }) => {
  let links = []

  switch(userType){
    case 'customer': links = linksForCustomer
      break
    case 'vendor': links = linksForVendor
      break
    case 'demonstrator': links = linksForDemonstrator
      break
    default: links = []
      break
  }

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
  drawerOpen: PropTypes.bool,
  userType: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
  userType: state.data.profile.data ? state.data.profile.data.userType : ''
})

export default connect(mapStateToProps)(DrawerComponent)
