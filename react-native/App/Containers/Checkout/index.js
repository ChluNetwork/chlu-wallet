import React, { Component } from 'react'
// rn-components
import { View, Text, Image, StatusBar } from 'react-native'
// other components
import DrawerButton from '../../Components/DrawerButton'
// styles
import layoutStyles from '../Styles/LayoutStyles'

class Checkout extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: <DrawerButton action={() => navigation.navigate('DrawerOpen')} />,
  })

  render () {
    return (
      <View style={layoutStyles.mainWrapper}>
        <StatusBar
          barStyle='light-content'
        />
        <Text>Checkout</Text>
      </View>
    )
  }
}

export default Checkout
