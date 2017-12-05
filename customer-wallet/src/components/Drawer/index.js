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
import { menuItemStyles } from 'styles/inlineStyles/components/drawer'
// data
import { linksForCustomer, linksForVendor, linksForDemonstrator } from 'fixtures/links'

const DrawerComponent = ({ toggleDrawer, drawerOpen, profile: { data } }) => {
  const userType = data ? data.userType : ''
  const userId = data ? data.id : 0
  let links = []

  switch(userType){
    case 'customer': links = linksForCustomer(userId)
      break
    case 'vendor': links = linksForVendor(userId)
      break
    case 'demonstrator': links = linksForDemonstrator(userId)
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
          <MenuItem {...menuItemStyles} >
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
  profile: PropTypes.shape({
    data: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]).isRequired
  }).isRequired
}

const mapStateToProps = store => ({
  profile: store.data.profile
})

export default connect(mapStateToProps)(DrawerComponent)
