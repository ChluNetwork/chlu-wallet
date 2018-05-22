import React from 'react'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
// assets
import { buttonsData } from '../assets/data'
// styles
import styles from 'styles/inlineStyles/containers/Customer/checkout'
// constants
const { radioButtonStyle } = styles

const Product = () => {
  const selectedRadio = buttonsData[0].value ? buttonsData[0].value : null

  return (
    <div className='payment section-content'>
      <RadioGroup
        name='payment-method'
        value={selectedRadio}
      >
        {buttonsData.map(({ icon, label, disabled, value }, idx) => (
          <Radio
            key={idx}
            value={value}
            label={label}
            className='payment-item container-border-bottom'
          />
        ))}
      </RadioGroup>
    </div>
  )
}

export default Product
