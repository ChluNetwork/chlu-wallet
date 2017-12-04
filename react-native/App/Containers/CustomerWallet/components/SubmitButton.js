import React from 'react'
import { func } from 'prop-types'
// rn-components
import { View, Text, TouchableOpacity } from 'react-native'
// styles
import styles from '../../Styles/CustomerWalletStyles'

const SubmitButton = ({ handleSubmit }) => (
  <View style={styles.formPaymentSubmitWrapper}>
    <TouchableOpacity onPress={handleSubmit} activeOpacity={0.8}>
      <View style={styles.formPaymentSubmitButton}>
        <Text style={styles.formPaymentSubmitButtonText}>
          Pay 0.1019 BTC
        </Text>
      </View>
    </TouchableOpacity>
  </View>
)

SubmitButton.propTypes = {
  handleSubmit: func
}

export default SubmitButton
