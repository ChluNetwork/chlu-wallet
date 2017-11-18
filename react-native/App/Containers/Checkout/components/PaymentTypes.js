import React from 'react'
import { array, func, number } from 'prop-types'
// rn-components
import { View } from 'react-native'
// other components
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
} from 'react-native-simple-radio-button'
// styles
import styles from '../../Styles/CheckoutStyles'
import { Colors } from '../../../Themes'

const PaymentTypes = ({ options, selectedPayment, handleSelectChange }) => (
  <View>
    <RadioForm
      formHorizontal={false}
      animation
      style={styles.radioFormWrapper}
    >
      {options.map((obj, i) => (
        <RadioButton
          style={styles.radioButton}
          wrapStyle={styles.radioButtonWrapper}
          labelHorizontal
          key={i}
        >
          <RadioButtonInput
            obj={obj}
            index={i}
            isSelected={selectedPayment === i}
            onPress={handleSelectChange}
            borderWidth={3}
            buttonInnerColor={Colors.borderColor}
            buttonOuterColor={Colors.borderColor}
            buttonSize={15}
            buttonOuterSize={30}
            buttonWrapStyle={styles.radioButtonOuter}
          />
          <RadioButtonLabel
            obj={obj}
            index={i}
            labelHorizontal
            onPress={handleSelectChange}
            labelStyle={styles.radioButtonLabel}
          />
        </RadioButton>
      ))}
    </RadioForm>
  </View>
)

PaymentTypes.propTypes = {
  options: array,
  selectedPayment: number,
  handleSelectChange: func
}

export default PaymentTypes
