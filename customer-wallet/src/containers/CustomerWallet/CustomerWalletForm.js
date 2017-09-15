import React from 'react'
import PropTypes from 'prop-types'
// libs
import { reduxForm, Field, change } from 'redux-form'
import { compose, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import { fx } from 'money'
// components
import RaisedButton from 'material-ui/RaisedButton'
import Input from 'components/Form/Input'
import Checkbox from 'components/Form/Checkbox'

const checkboxStyles = { width: '256px' }

const CustomerWalletForm = ({ handleSubmit, isReviewOpen, fieldBtcOnChange, fieldUsdOnChange }) => (
  <form onSubmit={handleSubmit} className='m-l-15 m-t-20'>
    <Field name='vendorAddress' label='Vendor Address' type='text' component={Input} />
    <label>Amount (BTC)</label>
    <div className='amount-btc__wrapper'>
      <Field
        name='amountBtc'
        type='tel'
        component={Input}
        onChange={fieldBtcOnChange}
        fullWidth
      />
      <span>=</span>
      <Field
        name='amountUsd'
        type='tel'
        component={Input}
        onChange={fieldUsdOnChange}
        fullWidth
      />
    </div>
    <p className='m-b-20'>Review</p>
    <Field
      label='Write a review now'
      name='reviewOpen'
      component={Checkbox}
      style={checkboxStyles}
    />
    {isReviewOpen &&
      <Field
        name='review'
        type='text'
        component={Input}
        multiLine
      />}
    <RaisedButton
      primary
      type='submit'
      className='m-t-20'
      label='Send Payment'
    />
  </form>
)

CustomerWalletForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  isReviewOpen: PropTypes.bool
}

const mapDispatchToProps = dispatch => ({
  changeField: (form, field, value) => dispatch(change(form, field, value))
})

export default compose(
  reduxForm({ form: 'customer-wallet-form' }),
  connect(null, mapDispatchToProps),
  withHandlers({
    fieldBtcOnChange: props => (e, value) => {
      const convertedValue = fx.convert(value, { from: 'BTC', to: 'USD' })
      props.changeField('customer-wallet-form', 'amountUsd', convertedValue.toFixed(2))
    },
    fieldUsdOnChange: props => (e, value) => {
      const convertedValue = fx.convert(value, { from: 'USD', to: 'BTC' })
      props.changeField('customer-wallet-form', 'amountBtc', convertedValue.toFixed(2))
    }
  })
)(CustomerWalletForm)
