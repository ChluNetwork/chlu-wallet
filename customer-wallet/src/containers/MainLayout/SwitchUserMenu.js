import React from 'react'
import PropType from 'prop-types'
// components
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import SwitchUser from 'images/svg/switch-user.svg'

const iconStyle = {
  color: 'white',
  cursor: 'pointer',
  width: 25
}

const listStyle = {
  textAlign: 'left'
}

const SwitchUserMenu = ({ items, isOpen, onRequestChange, onItemClick }) => (
  <IconMenu
    iconButtonElement={<IconButton iconStyle={iconStyle}>
      <img src={SwitchUser} alt='switch-user' />
    </IconButton>}
    open={isOpen}
    onRequestChange={onRequestChange}
    listStyle={listStyle}
  >
    {
      items.map((user, index) =>
        <MenuItem value={user} primaryText={user} onClick={() => onItemClick(user)} key={index} />)
    }
  </IconMenu>
)


SwitchUserMenu.propType = {
  items: PropType.array.isRequired,
  isOpen: PropType.bool.isRequired,
  onRequestChange: PropType.func.isRequired,
  onItemClick: PropType.func.isRequired
}

export default SwitchUserMenu
