import React, { Component } from 'react'
// rn-components
import { View, Text, StatusBar } from 'react-native'
// other components
import DrawerButton from '../../Components/DrawerButton'
// styles
import { ApplicationStyles } from '../../Themes'

class Transactions extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: <DrawerButton action={() => navigation.navigate('DrawerOpen')} />
  })

  render () {
    return (
      <View style={ApplicationStyles.screen.mainContainer}>
        <StatusBar
          barStyle='light-content'
        />
        <Text>Transactions</Text>
      </View>
    )
  }
}

export default Transactions
