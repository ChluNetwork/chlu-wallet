import React from 'react'
import { func, bool } from 'prop-types'
import { connect } from 'react-redux'
// components
import Drawer from '@material-ui/core/Drawer'
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
// redux
import { push } from 'react-router-redux'
import { toggleDrawer } from 'store/modules/ui/drawer'
// icons
import StarIcon from '@material-ui/icons/Star';
import BitcoinIcon from '@material-ui/icons/AccountBalanceWallet';
import PaymentIcon from '@material-ui/icons/Send';
import SettingsIcon from '@material-ui/icons/Settings'

const Sidebar = ({ toggleDrawer, drawerOpen, push }) => {

  function nav(x) {
    toggleDrawer()
    push(x)
  }

  return (
    <Drawer
      onClose={toggleDrawer}
      open={drawerOpen}
    >
      <List component='nav'>
        <ListItem button onClick={() => nav('/claim')}>
          <ListItemIcon><StarIcon/></ListItemIcon>
          <ListItemText primary='My Reputation' />
        </ListItem>
        <ListItem button onClick={() => nav('/transactions')}>
          <ListItemIcon><BitcoinIcon/></ListItemIcon>
          <ListItemText primary='Transactions' />
        </ListItem>
        <ListItem button onClick={() => nav('/pay')}>
          <ListItemIcon><PaymentIcon/></ListItemIcon>
          <ListItemText primary='Pay' />
        </ListItem>
        <ListItem button onClick={() => nav('/settings')}>
          <ListItemIcon><SettingsIcon/></ListItemIcon>
          <ListItemText primary='Settings' />
        </ListItem>
        <ListItem button onClick={() => nav('/reviews')}>
            <ListItemIcon><StarIcon/></ListItemIcon>
            <ListItemText primary='Reviews Widget Demo' />
        </ListItem>
      </List>
    </Drawer>
  )
}

Sidebar.propTypes = {
  toggleDrawer: func,
  drawerOpen: bool
}

const mapStateToProps = state => ({
  drawerOpen: state.ui.drawer.open
})

function mapDispatchToProps(dispatch) {
  return {
    push: x => dispatch(push(x)),
    toggleDrawer: () => dispatch(toggleDrawer())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar)
