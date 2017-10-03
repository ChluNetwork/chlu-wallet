import React from 'react'
import PropType from 'prop-types'
// components
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import SwapHoriz from 'material-ui/svg-icons/action/swap-horiz'
import IconButton from 'material-ui/IconButton'

const iconStyle = {
  color: 'white',
  cursor: 'pointer'
}

const menuItemStyle = isActive => ({
  backgroundColor: isActive ? 'rgb(229,229,229)': 'inherit'
})

const SwitchUserMenu = ({ items, isOpen, onRequestChange, onItemClick, userId, userType }) => (
  <IconMenu
    iconButtonElement={<IconButton iconStyle={iconStyle}><SwapHoriz /></IconButton>}
    open={isOpen}
    onRequestChange={onRequestChange}
  >
    {
      items.map((user, index) =>
        <MenuItem
          value={user}
          primaryText={user}
          onClick={() => onItemClick(user, userId)}
          key={index}
          style={menuItemStyle(user === userType)}
        />
      )
    }
  </IconMenu>
)


SwitchUserMenu.propType = {
  items: PropType.array.isRequired,
  isOpen: PropType.bool.isRequired,
  onRequestChange: PropType.func.isRequired,
  onItemClick: PropType.func.isRequired,
  userId: PropType.oneOfType([PropType.number, PropType.string]).isRequired,
  userType: PropType.string.isRequired
}

export default SwitchUserMenu
