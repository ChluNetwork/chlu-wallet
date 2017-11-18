import React from 'react'
import { func, string } from 'prop-types'
// rn-components
import { View, Text, TextInput } from 'react-native'
// styles
import styles from '../../Styles/CustomerWalletStyles'

const Address = ({ handleInputChange, value }) => (
  <View style={styles.paymentFormAddressWrapper}>
    <Text style={styles.inputLabel}>Write address here</Text>
    <TextInput
      style={styles.inputField}
      value={value}
      autoCorrect={false}
      onChangeText={handleInputChange('address')}
      underlineColorAndroid={'transparent'}
      placeholder={'Vendor address'}
    />
    <View style={styles.userAddressAvatar}>
      <Text style={styles.userAddressAvatarText}>A</Text>
    </View>
  </View>
)

Address.propTypes = {
  handleInputChange: func,
  value: string
}

export default Address
