import React from 'react'
import { func, bool } from 'prop-types'
import { connect } from 'react-redux'
// components
import { push } from 'react-router-redux'
import Drawer from '@material-ui/core/Drawer'
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
// icons
import StarIcon from '@material-ui/icons/Star';
import BitcoinIcon from '@material-ui/icons/AccountBalanceWallet';
import SettingsIcon from '@material-ui/icons/Settings'

const DrawerComponent = ({ toggleDrawer, drawerOpen, push }) => {

  return (
    <Drawer
      onClose={toggleDrawer}
      open={drawerOpen}
    >
      <List component='nav'>
        <ListItem button onClick={() => push('/claim')}>
          <ListItemIcon><StarIcon/></ListItemIcon>
          <ListItemText primary='My Reputation' />
        </ListItem>
        <ListItem button onClick={() => push('/transactions')}>
          <ListItemIcon><BitcoinIcon/></ListItemIcon>
          <ListItemText primary='Transactions' />
        </ListItem>
        <ListItem button onClick={() => push('/settings')}>
          <ListItemIcon><SettingsIcon/></ListItemIcon>
          <ListItemText primary='Settings' />
        </ListItem>
      </List>
    </Drawer>
  )
}

DrawerComponent.propTypes = {
  toggleDrawer: func,
  drawerOpen: bool
}

function mapDispatchToProps(dispatch) {
  return {
    push: x => dispatch(push(x))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(DrawerComponent)
