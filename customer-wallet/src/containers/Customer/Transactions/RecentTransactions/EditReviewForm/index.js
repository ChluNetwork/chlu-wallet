import React from 'react'
// libs
import { reduxForm, Field } from 'redux-form'
// components
import StarRating from 'components/Form/StarRating'
import Input from 'components/Form/Input'
import RaisedButton from 'material-ui/RaisedButton'
// styles
import styles from 'styles/inlineStyles/containers/Customer/customerWallet'
// constants
const { ratingStyle, textFieldsStyle, submitBtnStyle } = styles

const EditReviewForm = ({ handleSubmit, handleCancel, onStarClick, rating, isLoading, pristine, submitFailed }) => (
  <form onSubmit={handleSubmit} className='edit-form color-main'>
    <Field
      name='rating'
      component={StarRating}
      {...ratingStyle}
    />
    <Field
      {...textFieldsStyle}
      name='comment'
      placeholder='Comment'
      type='text'
      component={Input}
      multiLine
    />
    <div className='edit-form__buttons'>
      <RaisedButton
        {...submitBtnStyle}
        type='submit'
        label={submitFailed ? 'Error' : (isLoading ? 'Loading...' : 'Save')}
        className='button-item'
        disabled={isLoading || pristine || submitFailed}
      />
      <RaisedButton
        {...submitBtnStyle}
        label='Cancel'
        className='button-item'
        onClick={handleCancel}
        disabled={isLoading}
      />
    </div>
  </form>
)

export default reduxForm({ form: 'edit-review-form' })(EditReviewForm)
