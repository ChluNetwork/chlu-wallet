import React from 'react'
import PropType from 'prop-types'
// components
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import Cached from 'material-ui/svg-icons/action/cached'

const buttonStyle = {
  color: 'white',
  marginTop: 12,
  marginRight: 5,
  cursor: 'pointer'
}

const listStyle = {
  textAlign: 'left'
}

const SwitchUserMenu = ({ items, isOpen, onRequestChange, onItemClick }) => (
  <IconMenu
    iconButtonElement={<Cached style={buttonStyle} />}
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
