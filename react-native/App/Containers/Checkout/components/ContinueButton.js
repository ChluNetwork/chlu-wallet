import React from 'react'
import { func } from 'prop-types'
// rn-components
import { View, Text, TouchableOpacity } from 'react-native'
// other components
import LinearGradient from 'react-native-linear-gradient'
// styles
import { Colors } from '../../../Themes'
import styles from '../../Styles/CheckoutStyles'

const ContinueButton = ({ handleSubmit }) => (
  <View style={styles.continueButtonWrapper}>
    <TouchableOpacity onPress={handleSubmit} activeOpacity={0.8}>
      <LinearGradient style={styles.continueButton} colors={[Colors.lightOrange, Colors.mediumOrange]}>
        <Text style={styles.continueButtonText}>
          Continue
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  </View>
)

ContinueButton.propTypes = {
  handleSubmit: func
}

export default ContinueButton
