import React from 'react'
import PropType from 'prop-types'
// components
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton'

const buttonStyle = {
  color: 'white',
  margin: '5px 0'
}

const listStyle = {
  textAlign: 'center'
}

const SwitchUserMenu = ({ items, isOpen, onRequestChange, onItemClick }) => (
  <IconMenu
    iconButtonElement={<FlatButton style={buttonStyle} label='Switch user' onClick={this.toggleMenuOpen}/>}
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
