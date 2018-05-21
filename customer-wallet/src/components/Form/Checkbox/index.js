import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
// components
import Checkbox from 'material-ui/core/Checkbox'

const CheckboxComponent = ({ input, meta: { error, touched }, ...rest }) => {
  return (
    <div className={cn('form-field m-b-10', { 'has-error': touched && error })}>
      <Checkbox
        {...rest}
        {...input}
        checked={!!input.value}
        onCheck={(event, checked) => input.onChange(checked)}
      />
    </div>
  )
}

CheckboxComponent.propTypes = {
  meta: PropTypes.object,
  input: PropTypes.object
}

export default CheckboxComponent
