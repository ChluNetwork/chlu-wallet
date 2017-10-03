import React from 'react'
import PropTypes from 'prop-types'
// libs
import { reduxForm, Field, change } from 'redux-form'
import { compose, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import { fx } from 'lib/fxRates'
// components
import RaisedButton from 'material-ui/RaisedButton'
import Avatar from 'material-ui/Avatar'
import Input from 'components/Form/Input'
import Checkbox from 'components/Form/Checkbox'
import StarRatingComponent from 'react-star-rating-component'
import CheckIcon from 'material-ui/svg-icons/toggle/check-box-outline-blank'
// constants
import { ratingColor, blue, mainColor, backgroundColorDark, borderColorDark } from 'context/palette'

const submitBtnStyles = {
  backgroundColor: ratingColor,
  labelColor: 'rgb(255, 255, 255)'
}

const avatarStyles = {
  color: blue,
  backgroundColor: backgroundColorDark,
  style: { border: `1px solid ${borderColorDark}`}
}

const checkboxStyles = (isActive) => ({
  iconStyle: { fill: isActive ? blue : mainColor }
})

const textFieldsStyle = {
  fullWidth: true,
  underlineFocusStyle: { borderColor: mainColor },
  floatingLabelStyle: { color: blue }
}

const VendorAddressInputStyle = { paddingRight: '45px' }

const ratingStyles = { starColor: ratingColor }

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
              name='vendorAddress'
              type='text'
              component={Input}
              {...textFieldsStyle}
              inputStyle={VendorAddressInputStyle}
            />
            <div className='vendor-address__avatar'>
              <Avatar
                {...avatarStyles}
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
                name='amountBtc'
                type='tel'
                component={Input}
                {...textFieldsStyle}
                placeholder='BTC'
                onChange={(e, value) => currencyFieldOnChange(e, value, convertFieldValue)}
                fullWidth
              />
              <div className='equally'>=</div>
              <Field
                name='amountUsd'
                type='tel'
                component={Input}
                {...textFieldsStyle}
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
                label='Write a review now'
                name='reviewOpen'
                component={Checkbox}
                {...checkboxStyles(isReviewOpen)}
                uncheckedIcon={<CheckIcon />}
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
                <div className='comment-label label font-smaller color-light'>Comment</div>
                <Field
                  name='review'
                  type='text'
                  component={Input}
                  {...textFieldsStyle}
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
