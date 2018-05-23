import React from 'react'
import { func, bool } from 'prop-types'
// components
import { Link } from 'react-router-dom'
import Drawer from '@material-ui/core/Drawer'
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
// icons
import StarIcon from '@material-ui/icons/Star';
import ThumbsUpDownIcon from '@material-ui/icons/ThumbsUpDown';
import PeopleIcon from '@material-ui/icons/People'
import SettingsIcon from '@material-ui/icons/Settings'

const DrawerComponent = ({ toggleDrawer, drawerOpen }) => {

  return (
    <Drawer
      onClose={toggleDrawer}
      open={drawerOpen}
    >
      <List component='nav'>
        <ListItem button>
          <ListItemIcon><StarIcon/></ListItemIcon>
          <ListItemText primary='My Reputation' />
        </ListItem>
        <ListItem button>
          <ListItemIcon><ThumbsUpDownIcon/></ListItemIcon>
          <ListItemText primary='Reputation Given' />
        </ListItem>
        <ListItem button>
          <ListItemIcon><PeopleIcon/></ListItemIcon>
          <ListItemText primary='Reputation Received' />
        </ListItem>
        <ListItem button>
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

export default DrawerComponent
