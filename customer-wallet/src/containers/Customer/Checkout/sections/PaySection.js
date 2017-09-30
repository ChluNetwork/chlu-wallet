import React from 'react'
// components
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
// assets
import { buttonsData } from '../assets/data'
// constants
import { borderColor } from 'context/palette'

const radioStyles = {
  style: {
    padding: '20px',
    borderBottom: `1px solid ${borderColor}`
  },
  iconStyle: {
    fill: borderColor
  }
}

const Product = () => {
  const selectedRadio = buttonsData[0].value ? buttonsData[0].value : null

  return (
    <div className='payment section-content'>
      <RadioButtonGroup
        name='payment-method'
        defaultSelected={selectedRadio}
        onChange={() => null }
      >
        {buttonsData.map(({ icon, label, disabled, value }, idx) => (
          <RadioButton
            key={idx}
            value={value}
            label={label}
            {...radioStyles}
          />
        ))}
      </RadioButtonGroup>
    </div>
  )
}

export default Product
