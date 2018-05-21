import React from 'react'
import { func, bool, number, array, string } from 'prop-types'
// libs
import { isEmpty, isUndefined } from 'lodash'
import { reduxForm, Field, formValueSelector } from 'redux-form'
import { compose } from 'recompose'
import { connect } from 'react-redux'
// hoc
import withFxRates from 'containers/Hoc/withFxRates'
// components
import Button from 'material-ui/core/Button'
import Avatar from 'material-ui/core/Avatar'
import Input from 'components/Form/Input'
import Select from 'components/Form/Select'
import Checkbox from 'components/Form/Checkbox'
import StarRatingComponent from 'react-star-rating-component'
import CheckIcon from 'material-ui/core/svg-icons/toggle/check-box-outline-blank'
// styles
import styles from 'styles/inlineStyles/containers/Customer/customerWallet'
// constants
const {
  submitBtnStyle,
  avatarStyle,
  getCheckboxStyle,
  textFieldsStyle,
  VendorAddressInputStyle,
  ratingStyle,
  switchPaymentBtnStyle
} = styles

const starCount = 5

const CustomerWalletForm = ({
  handleSubmit,
  onStarClick,
  ratingValue,
  isReviewOpen,
  loading,
  priceBtc,
  amountBtc,
  amountUsd,
  buttonsData,
  showModal,
  ownAddresses,
  handleChangeAddress,
  activeAddress,
  isDisabledSubmit,
  isCreditCardPayment,
  switchPaymentType
}) => (
  <form onSubmit={handleSubmit} className='form color-main'>
    <div className='container'>
      <div className='payment-switch-buttons m-b-35'>
        <Button
            {...switchPaymentBtnStyle}
            type='button'
            label={'Pay by Crypto'}
            onClick={switchPaymentType}
            className='submit-button'
            disabled={!isCreditCardPayment}
        />
        <Button
            {...switchPaymentBtnStyle}
            type='button'
            label={'Pay by MasterCard'}
            onClick={switchPaymentType}
            className='submit-button'
            disabled={isCreditCardPayment}
        />
      </div>
      {!isCreditCardPayment && <div className='fields-wrapper'>
        <div className='label font-smaller color-light'>Your Address</div>
        <div className='your-address__wrapper'>
          <Field
              {...textFieldsStyle}
              name='fromAddress'
              component={Select}
              value={activeAddress}
              options={ownAddresses.map((address) => ({ value: address, label: address }))}
              handleChange={handleChangeAddress}
          />
        </div>
        <div className='vendor-address'>
          <div className='vendor-address__label label font-smaller color-light'>Vendor Address</div>
          <Field
              {...textFieldsStyle}
              name='toAddress'
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
          <div className='payment-currency__title font-smaller color-light'>Payment cryptocurrency</div>
          <div className='payment-currency__buttons color-light'>
            {buttonsData.map(({ label, active, icon, iconBlue }, idx) => (
               <div
                   className={`button ${active ? 'button-active' : null }`}
                   key={idx}
                   onClick={showModal}
               >
                 <div className='button-icon'>
                   <img src={active ? iconBlue : icon} alt={label} className='icon' />
                 </div>
                 <div className='button-label'>{label}</div>
               </div>
             ))}
          </div>
        </div>
      </div>}
      {isCreditCardPayment && <div className='fields-wrapper'>
        <div className='label font-smaller color-light'>Cardholder Name</div>
        <Field
            {...textFieldsStyle}
            name='cardholderName'
            type='text'
            component={Input}
            fullWidth
        />

        <div className='label font-smaller color-light'>Card Number</div>
        <Field
            {...textFieldsStyle}
            name='cardNumber'
            type='text'
            component={Input}
            fullWidth
        />
        <div className='label font-smaller color-light'>Expiry Date</div>
        <Field
            {...textFieldsStyle}
            name='expDate'
            type='text'
            component={Input}
            fullWidth
        />
        <div className='label font-smaller color-light'>CV</div>
        <Field
            {...textFieldsStyle}
            name='cvv'
            type='text'
            component={Input}
            fullWidth
        />
      </div>}
    </div>
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
             </div>}
          </div>
        </div>
      </div>
    </div>
    <div className='button-container'>
      <div className='container'>
        <Button
          {...submitBtnStyle}
          type='submit'
          label={isDisabledSubmit || isUndefined(amountBtc) ? 'Pay' : `Pay ${amountBtc} bits`}
          className='submit-button'
          disabled={isDisabledSubmit}
        />
      </div>
    </div>
  </form>
)

CustomerWalletForm.propTypes = {
  handleSubmit: func.isRequired,
  onStarClick: func.isRequired,
  handleChangeAddress: func.isRequired,
  isReviewOpen: bool,
  loading: bool,
  isCreditCardPayment: bool,
  ratingValue: number,
  getFx: func,
  showModal: func,
  switchPaymentType: func,
  ownAddresses: array,
  activeAddress: string,
  isDisabledSubmit: bool
}

function validate(values) {
  const errors = {}
  const requiredFieldError = 'This field is required'
  // Cryptocurrency payment
  if (isEmpty(values.toAddress)) errors.toAddress = requiredFieldError
  if (isEmpty(String(values.amountBtc)) && isEmpty(String(values.amountUsd))) {
    errors.amountBtc = requiredFieldError
    errors.amountUsd = requiredFieldError
  }
  // Credit card payment
  if (isEmpty(values.cardholderName)) errors.cardholderName = requiredFieldError
  if (isEmpty(values.cardNumber)) errors.cardNumber = requiredFieldError
  if (isEmpty(values.expDate)) errors.expDate = requiredFieldError
  if (isEmpty(values.cvv)) errors.cvv = requiredFieldError
  return errors
}

const selector = formValueSelector('customer-wallet-form')

export default compose(
  reduxForm({
    form: 'customer-wallet-form',
    validate
  }),
  withFxRates,
  connect( state => {
      const { amountBtc, amountUsd } = selector(state, 'amountBtc', 'amountUsd')
      return {
          amountBtc,
          amountUsd
      }
  })
)(CustomerWalletForm)
