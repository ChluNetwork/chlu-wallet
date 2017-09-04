import React from 'react'
import PropTypes from 'prop-types'
// components
import { reduxForm, Field } from 'redux-form'
import RaisedButton from 'material-ui/RaisedButton'
import Input from '../../components/Form/Input'
import Checkbox from '../../components/Form/Checkbox'

const checkboxStyles = { width: '256px' }

const CustomerWalletForm = ({ handleSubmit, isReviewOpen }) => (
  <form onSubmit={handleSubmit} className='m-l-15 m-t-20'>
    <Field name='vendorAddress' label='Vendor Address' type='text' component={Input} />
    <label>Amount (BTC)</label>
    <div className='amount-btc__wrapper'>
      <Field fullWidth name='amountBtc' type='tel' component={Input} />
      <span>=</span>
      <Field fullWidth name='amountUsd' type='tel' component={Input} />
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

export default reduxForm({
  form: 'customer-wallet-form'
})(CustomerWalletForm)
