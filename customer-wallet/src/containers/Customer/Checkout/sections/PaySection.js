import React from 'react'
// components
import { Radio, RadioGroup } from '@material-ui/core/Radio';
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
        defaultSelected={selectedRadio}
        onChange={() => null }
      >
        {buttonsData.map(({ icon, label, disabled, value }, idx) => (
          <Radio
            key={idx}
            {...radioButtonStyle}
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
