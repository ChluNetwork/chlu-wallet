import React from 'react'
import PropTypes from 'prop-types'
// libs
import { reduxForm, Field, change } from 'redux-form'
import { compose, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import { fx } from 'lib/fxRates'
// components
import RaisedButton from 'material-ui/RaisedButton'
import Input from 'components/Form/Input'
import Checkbox from 'components/Form/Checkbox'
import StarRatingComponent from 'react-star-rating-component'
// constants
import { ratingColor, blue } from 'context/palette'

const submitBtnStyles = {
  backgroundColor: ratingColor,
  labelColor: 'rgb(255, 255, 255)'
}

const checkboxStyles = {
  iconStyle: { fill: blue }
}

const textFildsStyle = {
  style: { height: '40px' }
}

const ratingStyles = {
  starColor: ratingColor
}

const starCount = 5

const CustomerWalletForm = ({
  handleSubmit,
  onStarClick,
  ratingValue,
  isReviewOpen,
  currencyFieldOnChange,
  convertFieldValue,
  loading,
  priceBtc,
  buttonsData,
  toggleModal
}) => (
  <form onSubmit={handleSubmit} className='form color-main'>
    <div className='container'>
      <label className='vendor-address__label font-smaller color-light'>Vendor Address</label>
      <Field name='vendorAddress' type='text'component={Input} {...textFildsStyle} />

      <div className='payment-currency'>
        <div className='payment-currency__title font-smaller color-light'>Payment currency</div>
        <div className='payment-currency__buttons'>
          {buttonsData.map(({ label, active, icon }, idx) => (
            <div className={`button ${active ? 'button-active' : null }`} key={idx} onClick={toggleModal}>
              <div className='button-icon'>
                <img src={icon} alt={label}/>
              </div>
              <div className='button-label'>{label}</div>
            </div>
          ))}
        </div>
      </div>

      <label className='amount-label font-smaller color-light'>Amount (BTC)</label>
      <div className='amount-btc__wrapper'>
        <Field
          name='amountBtc'
          type='tel'
          component={Input}
          {...textFildsStyle}
          placeholder='BTC'
          onChange={(e, value) => currencyFieldOnChange(e, value, convertFieldValue)}
          fullWidth
        />
        <div className='equally'>=</div>
        <Field
          name='amountUsd'
          type='tel'
          component={Input}
          {...textFildsStyle}
          placeholder='USD'
          onChange={(e, value) => currencyFieldOnChange(e, value, convertFieldValue)}
          fullWidth
        />
      </div>
      <div className='review'>
        <div className='review-fields'>
          <Field
            label='Write a review now'
            name='reviewOpen'
            component={Checkbox}
            {...checkboxStyles}
          />
          {isReviewOpen &&
            <div>
              <StarRatingComponent
                className='review-rating'
                name='rating'
                starCount={starCount}
                value={ratingValue}
                onStarClick={onStarClick}
                starColor={ratingColor}
                {...ratingStyles}
              />
              <div className='comment-label font-smaller color-light'>Comment</div>
              <Field
                name='review'
                type='text'
                component={Input}
                multiLine
              />
            </div>
          }
        </div>
      </div>
    </div>
    <div className='button-container'>
      <div className='container'>
        <RaisedButton
          type='submit'
          label={loading ? 'Loading...' : `Pay ${priceBtc} BTC`}
          {...submitBtnStyles}
          className='submit-button'
        />
      </div>
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
