import React, { Component } from 'react'
// rn-components
import { View, Text, StatusBar, ScrollView } from 'react-native'
// other components
import DrawerButton from '../../Components/DrawerButton'
import Product from './components/Product'
import PaymentTypes from './components/PaymentTypes'
import ContinueButton from './components/ContinueButton'
// styles
import styles from '../Styles/CheckoutStyles'

const options = [
  { label: 'Chlu', value: 0 },
  { label: 'Credit card', value: 1 },
  { label: 'PayPal', value: 2 }
]

class Checkout extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: <DrawerButton action={() => navigation.navigate('DrawerOpen')} />
  })

  state = {
    selectedPayment: 0
  }

  handleSelectChange = (value) => {
    this.setState({ selectedPayment: value })
  }

  handleSubmit = () => {
    console.log('submitted')
  }

  render () {
    const { selectedPayment } = this.state
    return (
      <ScrollView>
        <View style={styles.container}>
          <StatusBar barStyle='light-content' />
          <Product />
          <Text style={styles.radioFormTitle}>
            Payment Method
          </Text>
          <PaymentTypes
            selectedPayment={selectedPayment}
            options={options}
            handleSelectChange={this.handleSelectChange}
          />
          <ContinueButton handleSubmit={this.handleSubmit} />
        </View>
      </ScrollView>
    )
  }
}

export default Checkout
