import React from 'react'
import CustomInput from 'components/MaterialDashboardPro/CustomInput'

function CustomFormInput(props) {
  const { input, meta: { touched, error }, helpText, inputProps, ...others } = props
  const hasError = Boolean(touched && error)

  return <CustomInput
    error={hasError}
    helpText={hasError ? error : helpText}
    inputProps={{ ...inputProps, ...input }}
    {...others}
  />
}

export default CustomFormInput
