import React, { Component } from 'react'
import PropTypes from 'prop-types'
// components
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
// helpers
import get from 'lodash/get'

class CustomSelect extends Component {
  constructor(props) {
    super(props)

    const { options } = props

    this.state = { value: get(options, '[0].value', null) }
  }

  ownChange = (e, index, value) => {
    const { input, handleChange } = this.props

    this.setState({ value })

    input.onChange(e)
    handleChange && handleChange(value)
  }

  render () {
    const { input, options = [], handleChange,  meta: { touched, error }, label, placeholder, ...others } = this.props
    const { value } = this.state
    const hasError = touched && error

    return (
      <div>
        {!!label && <span className='input-label'>{label}</span>}
        <div className='input-wrapper'>
          <Select
            {...input}
            {...others}
            errorText={hasError ? error : undefined}
            placeholder={placeholder}
            onChange={this.ownChange}
            value={value}
            floatingLabelText={get(input, 'selected')}
          >
            {options.map(({ value, label }, index) => <MenuItem value={value} primaryText={label} key={index} />)}
          </Select>
        </div>
      </div>
    )
  }
}

CustomSelect.propTypes = {
  select: PropTypes.object,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  handleChange: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    label: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  }))
}

export default CustomSelect
