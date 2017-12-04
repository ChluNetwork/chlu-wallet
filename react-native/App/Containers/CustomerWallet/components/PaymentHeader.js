import React from 'react'
// rn-components
import { View, Text } from 'react-native'
// styles
import styles from '../../Styles/CustomerWalletStyles'

const PaymentHeader = () => (
  <View style={styles.headerWrapper}>
    <Text style={styles.headerTitle}>Payment for Shinny New Toy</Text>
    <View style={styles.priceWrapper}>
      <Text style={styles.priceUsd}>$ 400</Text>
      <Text style={styles.priceBtc}>0.0621 BTC</Text>
    </View>
  </View>
)

export default PaymentHeader
