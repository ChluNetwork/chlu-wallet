import React from 'react'
import { func, string } from 'prop-types'
// rn-components
import { View, Text, TextInput } from 'react-native'
// styles
import styles from '../../Styles/CustomerWalletStyles'

const PaymentCurrency = ({ handleInputChange, usdValue, btcValue }) => (
  <View style={styles.mt30}>
    <Text style={styles.inputLabel}>Amount (BTC)</Text>
    <View style={styles.formPaymentAmountWrapper}>
      <TextInput
        style={styles.inputField}
        value={usdValue}
        autoCorrect={false}
        onChangeText={handleInputChange('btc')}
        underlineColorAndroid={'transparent'}
        placeholder={'BTC'}
      />
      <Text style={styles.formPaymentAmountEqually}>=</Text>
      <TextInput
        style={styles.inputField}
        value={btcValue}
        autoCorrect={false}
        onChangeText={handleInputChange('usd')}
        underlineColorAndroid={'transparent'}
        placeholder={'USD'}
      />
    </View>
  </View>
)

PaymentCurrency.propTypes = {
  handleInputChange: func,
  usdValue: string,
  btcValue: string
}

export default PaymentCurrency
