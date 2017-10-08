import React from 'react'
// libs
import { reduxForm, Field } from 'redux-form'
// components
import StarRatingComponent from 'react-star-rating-component'
import Input from 'components/Form/Input'
import RaisedButton from 'material-ui/RaisedButton'
// styles
import styles from 'styles/inlineStyles/containers/Customer/customerWallet'
// constants
const { ratingStyle, textFieldsStyle, submitBtnStyle } = styles

const starCount = 5

const EditReviewForm = ({ handleSubmit, handleCancel, onStarClick, rating, isLoading }) => (
  <form onSubmit={handleSubmit} className='edit-form color-main'>
    <div className='edit-form__title'>Edit Review</div>
    <StarRatingComponent
      className='edit-form__rating'
      name='rating'
      starCount={starCount}
      value={rating}
      onStarClick={onStarClick}
      {...ratingStyle}
    />
    <Field
      name='comment'
      placeholder='Comment'
      type='text'
      component={Input}
      {...textFieldsStyle}
      multiLine
    />
    <div className='edit-form__buttons'>
      <RaisedButton
        type='submit'
        label={isLoading ? 'Loading...' : 'Save'}
        className='button-item'
        {...submitBtnStyle}
      />
      <RaisedButton
        label='Cancel'
        className='button-item'
        {...submitBtnStyle}
        onClick={handleCancel}
      />
    </div>
  </form>
)

export default reduxForm({ form: 'edit-review-form' })(EditReviewForm)
