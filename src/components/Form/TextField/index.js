import React from 'react'
// components
import TextField from '@material-ui/core/TextField'

const TextFieldComponent = ({ input, label, placeholder,
                              helperText,
                              meta: { error, touched }, ...rest }
) => {
  return (
    <TextField
        label={label}
        helperText={helperText}
        error={touched && error}
        {...input}
        {...rest}
    />
  )
}

export default TextFieldComponent
