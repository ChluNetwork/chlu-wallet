import React from 'react'
import PropType from 'prop-types'
// components
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import SwapHoriz from 'material-ui/svg-icons/action/swap-horiz'
import IconButton from 'material-ui/IconButton'
// styles
import style from 'styles/inlineStyles/containers/MainLayout'
// constants
const { switchUser: { iconStyle, getStyle } } = style

const SwitchUserMenu = ({ items, isOpen, onRequestChange, onItemClick, userId, userType }) => (
  <IconMenu
    iconButtonElement={<IconButton {...iconStyle}><SwapHoriz /></IconButton>}
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
          style={getStyle(user === userType)}
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
