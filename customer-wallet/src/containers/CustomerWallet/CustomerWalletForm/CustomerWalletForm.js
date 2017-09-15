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
import StarRatingComponent from 'react-star-rating-component'

const checkboxStyles = { width: '256px' }
const starCount = 5

const CustomerWalletForm = ({
  handleSubmit,
  onStarClick,
  ratingValue,
  isReviewOpen,
  currencyFieldOnChange,
  convertFieldValue,
  loading
}) => (
  <form onSubmit={handleSubmit} className='m-l-15 m-t-20'>
    <Field name='vendorAddress' label='Vendor Address' type='text' component={Input} />
    <label>Amount (BTC)</label>
    <div className='amount-btc__wrapper'>
      <Field
        name='amountBtc'
        type='tel'
        component={Input}
        placeholder='BTC'
        onChange={(e, value) => currencyFieldOnChange(e, value, convertFieldValue)}
        fullWidth
      />
      <span>=</span>
      <Field
        name='amountUsd'
        type='tel'
        component={Input}
        placeholder='USD'
        onChange={(e, value) => currencyFieldOnChange(e, value, convertFieldValue)}
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
      <div>
        <StarRatingComponent
          className='stars'
          name='rating'
          starCount={starCount}
          value={ratingValue}
          onStarClick={onStarClick}
        />
        <Field
          name='review'
          type='text'
          component={Input}
          multiLine
        />
      </div>
    }
    <div className='button-container'>
      <RaisedButton
        primary
        type='submit'
        className='m-t-20'
        label={loading ? 'Loading...' : 'Send Payment'}
      />
    </div>
  </form>
)

CustomerWalletForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onStarClick: PropTypes.func.isRequired,
  currencyFieldOnChange: PropTypes.func.isRequired,
  convertFieldValue: PropTypes.func.isRequired,
  isReviewOpen: PropTypes.bool,
  loading: PropTypes.bool,
  ratingValue: PropTypes.number
}

const mapDispatchToProps = dispatch => ({
  changeField: (form, field, value) => dispatch(change(form, field, value))
})

export default compose(
  reduxForm({ form: 'customer-wallet-form' }),
  connect(null, mapDispatchToProps),
  withHandlers({
    convertFieldValue: props => (value, { name, fromTo }) => {
      const convertedValue = fx.convert(value, fromTo)
      props.changeField('customer-wallet-form', name, convertedValue.toFixed(2))
    },
    currencyFieldOnChange: (props) => (e, value, fn) => {
      const name = e.target.name
      const convertOptions = {
        amountBtc: { name: 'amountUsd', fromTo: { from: 'BTC', to: 'USD' } },
        amountUsd: { name: 'amountBtc', fromTo: { from: 'USD', to: 'BTC' } }
      }

      fn(value, convertOptions[name])
    }
  })
)(CustomerWalletForm)
