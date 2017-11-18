import React from 'react'
import PropTypes from 'prop-types'
// react-native components
import { TouchableOpacity } from 'react-native'
// icon
import Icon from 'react-native-vector-icons/FontAwesome'
// styles
import Styles from './Styles/DrawerButtonStyles'
import Colors from '../Themes/Colors'

const DrawerButton = ({ action }) => (
  <TouchableOpacity onPress={action} style={Styles.wrapper}>
    <Icon name={'navicon'} size={20} color={Colors.snow} />
  </TouchableOpacity>
)

DrawerButton.propTypes = {
  action: PropTypes.func.isRequired
}

export default DrawerButton
