import React, { Component } from 'react'
// rn-components
import { View, Text, Image, StatusBar, TextInput } from 'react-native'
// other components
import DrawerButton from '../../Components/DrawerButton'
// styles
import layoutStyles from '../Styles/LayoutStyles'
import styles from '../Styles/CustomerWalletStyles'

class Customer extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: <DrawerButton action={() => navigation.navigate('DrawerOpen')} />,
    drawerLabel: 'Customer Wallet'
  })

  state = {
    formValues: {
      address: ''
    }
  }

  handleInputChange = (name) => (text) => {
    this.setState(({ formValues }) => ({
      formValues: {
        ...formValues,
        [name]: text
      }
    }))
  }

  render () {
    const { formValues } = this.state
    return (
      <View style={layoutStyles.mainWrapper}>
        <StatusBar
          barStyle='light-content'
        />
        <View style={styles.headerWrapper}>
          <Text style={styles.headerTitle}>Payment for Shinny New Toy</Text>
          <View style={styles.priceWrapper}>
            <Text style={styles.priceUsd}>$ 400</Text>
            <Text style={styles.priceBtc}>0.0621 BTC</Text>
          </View>
        </View>
        <View style={styles.paymentForm}>
          <Text style={styles.inputLabel}>Vendor Address</Text>
          <TextInput
            style={styles.inputField}
            value={formValues.address}
            autoCorrect={false}
            onChangeText={this.handleInputChange('address')}
            underlineColorAndroid={'transparent'}
            placeholder={'Vendor address'}
          />
        </View>
      </View>
    )
  }
}

export default Customer
