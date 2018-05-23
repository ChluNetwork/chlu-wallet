import React from 'react'
import { array, bool, func, string } from 'prop-types'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SwapHoriz from '@material-ui/icons/SwapHoriz'
import IconButton from '@material-ui/core/IconButton'

const SwitchUserMenu = ({ items, isOpen, onRequestChange, onItemClick, userType }) => (
  <Menu
    iconButtonElement={<IconButton><SwapHoriz /></IconButton>}
    open={isOpen}
    onRequestChange={onRequestChange}
  >
    {
      items.map((user, index) =>
        <MenuItem
          value={user}
          primaryText={user}
          onClick={() => onItemClick(user)}
          key={index}
          classes={user === userType ? ['active'] : ['root']}
        />
      )
    }
  </Menu>
)

SwitchUserMenu.propType = {
  items: array,
  isOpen: bool,
  onRequestChange: func,
  onItemClick: func,
  userType: string
}

export default SwitchUserMenu
