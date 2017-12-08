import React from 'react'
import { func, bool, number } from 'prop-types'
// libs
import { reduxForm, Field, change } from 'redux-form'
import { compose, withHandlers } from 'recompose'
import { connect } from 'react-redux'
// hoc
import withFxRates from 'containers/withFxRates'
// components
import RaisedButton from 'material-ui/RaisedButton'
import Avatar from 'material-ui/Avatar'
import Input from 'components/Form/Input'
import Checkbox from 'components/Form/Checkbox'
import StarRatingComponent from 'react-star-rating-component'
import CheckIcon from 'material-ui/svg-icons/toggle/check-box-outline-blank'
// styles
import styles from 'styles/inlineStyles/containers/Customer/customerWallet'
// constants
const { submitBtnStyle, avatarStyle, getCheckboxStyle, textFieldsStyle, VendorAddressInputStyle, ratingStyle } = styles

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
    <div className='container-border-bottom'>
      <div className='container'>
        <div className='fields-wrapper'>
          <div className='vendor-address'>
            <div className='vendor-address__label label font-smaller color-light'>Vendor Address</div>
            <Field
              {...textFieldsStyle}
              name='vendorAddress'
              type='text'
              component={Input}
              inputStyle={VendorAddressInputStyle}
            />
            <div className='vendor-address__avatar'>
              <Avatar
                {...avatarStyle}
                size={40}
              >
                A
              </Avatar>
            </div>
          </div>
          <div className='payment-currency'>
            <div className='payment-currency__title font-smaller color-light'>Payment currency</div>
            <div className='payment-currency__buttons color-light'>
              {buttonsData.map(({ label, active, icon, iconBlue }, idx) => (
                <div
                  className={`button ${active ? 'button-active' : null }`}
                  key={idx}
                  onClick={toggleModal}
                >
                  <div className='button-icon'>
                    <img src={active ? iconBlue : icon} alt={label} className='icon' />
                  </div>
                  <div className='button-label'>{label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className='amount-btc'>
            <div className='amount-btc__label label font-smaller color-light'>Amount (BTC)</div>
            <div className='amount-btc__fields'>
              <Field
                {...textFieldsStyle}
                name='amountBtc'
                type='tel'
                component={Input}
                placeholder='BTC'
                onChange={(e, value) => currencyFieldOnChange(e, value, convertFieldValue)}
                fullWidth
              />
              <div className='equally'>=</div>
              <Field
                {...textFieldsStyle}
                name='amountUsd'
                type='tel'
                component={Input}
                placeholder='USD'
                onChange={(e, value) => currencyFieldOnChange(e, value, convertFieldValue)}
                fullWidth
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className='container-border-bottom'>
      <div className='container'>
        <div className='fields-wrapper'>
          <div className='review'>
            <div className='review-fields'>
              <Field
                {...getCheckboxStyle(isReviewOpen)}
                label='Write a review now'
                name='reviewOpen'
                component={Checkbox}
                uncheckedIcon={<CheckIcon />}
              />
              {isReviewOpen &&
                <div>
                  <StarRatingComponent
                    {...ratingStyle}
                    className='review-rating'
                    name='rating'
                    starCount={starCount}
                    value={ratingValue}
                    onStarClick={onStarClick}
                  />
                  <div className='comment-label label font-smaller color-light'>Comment</div>
                  <Field
                    {...textFieldsStyle}
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
      </div>
    </div>
    <div className='button-container'>
      <div className='container'>
        <RaisedButton
          {...submitBtnStyle}
          type='submit'
          label={loading ? 'Loading...' : `Pay ${priceBtc} BTC`}
          className='submit-button'
        />
      </div>
    </div>
  </form>
)

CustomerWalletForm.propTypes = {
  handleSubmit: func.isRequired,
  onStarClick: func.isRequired,
  currencyFieldOnChange: func.isRequired,
  convertFieldValue: func.isRequired,
  isReviewOpen: bool,
  loading: bool,
  ratingValue: number,
  getFx: func
}

const mapDispatchToProps = dispatch => ({
  changeField: (form, field, value) => dispatch(change(form, field, value))
})

export default compose(
  reduxForm({ form: 'customer-wallet-form' }),
  withFxRates,
  connect(null, mapDispatchToProps),
  withHandlers({
    convertFieldValue: ({ getFx, changeField }) => (value, { name, fromTo }) => {
      const convertedValue = getFx().convert(value, fromTo)
      changeField('customer-wallet-form', name, convertedValue.toFixed(2))
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
