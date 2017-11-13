import React, { Component } from 'react'
// rn-components
import { View, Text, Image, StatusBar } from 'react-native'
// other components
import DrawerButton from '../../Components/DrawerButton'
// styles
import styles from '../Styles/LayoutStyles'

class Transactions extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: <DrawerButton action={() => navigation.navigate('DrawerOpen')} />,
  })

  render () {
    return (
      <View style={styles.mainWrapper}>
        <StatusBar
          barStyle='light-content'
        />
        <Text>Transactions</Text>
      </View>
    )
  }
}

export default Transactions
