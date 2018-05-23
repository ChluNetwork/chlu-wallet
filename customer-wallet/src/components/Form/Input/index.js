import React from 'react'
import PropTypes from 'prop-types'
import { withStyles, TextField } from '@material-ui/core';


function FormInput(props) {
  const { input, meta: { touched, error }, ...others } = props
  const hasError = touched && error

  return <TextField
    error={hasError && error}
    {...input}
    {...others}
  />
}

FormInput.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  meta: PropTypes.object,
  onChange: PropTypes.func,
  readOnly: PropTypes.bool
}

export default withStyles({})(FormInput)
