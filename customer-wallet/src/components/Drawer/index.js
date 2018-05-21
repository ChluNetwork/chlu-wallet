import React from 'react'
import { func, bool, shape, oneOfType, object } from 'prop-types'
// redux
import { connect } from 'react-redux'
// components
import { Link } from 'react-router'
import Drawer from '@material-ui/core/Drawer'
import MenuItem from '@material-ui/core/MenuItem'
// styles
import './styles.css'
import { menuItemStyles } from 'styles/inlineStyles/components/drawer'
// data
import { linksForCustomer, linksForVendor, linksForDemonstrator } from 'fixtures/links'

const DrawerComponent = ({ toggleDrawer, drawerOpen, profile: { data } }) => {
  const userType = data ? data.userType : ''
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
          <MenuItem {...menuItemStyles} >
            {label}
          </MenuItem>
        </Link>
      ))}
    </Drawer>
  )
}

DrawerComponent.propTypes = {
  toggleDrawer: func,
  drawerOpen: bool,
  profile: shape({
    data: oneOfType([object, bool])
  })
}

const mapStateToProps = store => ({
  profile: store.data.profile
})

export default connect(mapStateToProps)(DrawerComponent)
