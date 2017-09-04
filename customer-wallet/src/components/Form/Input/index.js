import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
// components
import TextField from 'material-ui/TextField'

const Input = ({ input, label, type, placeholder, meta: { touched, error }, onChange, readOnly, ...others }) => {
  const inputOnChange = (e) => {
    input.onChange(e)
    onChange && onChange(e.target.value)
  }

  return (
    <div className={cn('form-field m-b-10', { 'has-error': touched && error })}>
      <span className='input-label'>{label}</span>
      <div className='input-wrapper'>
        <TextField
          {...input}
          {...others}
          onChange={inputOnChange}
          placeholder={placeholder}
          type={type}
          readOnly={readOnly}
        />
      </div>
    </div>
  )
}

Input.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  meta: PropTypes.object,
  onChange: PropTypes.func,
  readOnly: PropTypes.bool
}

export default Input
