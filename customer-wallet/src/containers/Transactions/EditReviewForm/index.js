import React from 'react'
// libs
import { reduxForm, Field } from 'redux-form'
// components
import StarRating from 'components/Form/StarRating'
import Input from 'components/Form/Input'
import Button from '@material-ui/core/Button'

const EditReviewForm = ({ handleSubmit, handleCancel, onStarClick, rating, isLoading, pristine, submitFailed }) => (
  <form onSubmit={handleSubmit}>
    <Field
      name='rating'
      component={StarRating}
    />
    <Field
      name='comment'
      placeholder='Comment'
      type='text'
      component={Input}
      multiLine
    />
    <div>
      <Button
        type='submit'
        label={submitFailed ? 'Error' : (isLoading ? 'Loading...' : 'Save')}
        disabled={isLoading || pristine || submitFailed}
      />
      <Button
        label='Cancel'
        onClick={handleCancel}
        disabled={isLoading}
      />
    </div>
  </form>
)

export default reduxForm({ form: 'edit-review-form' })(EditReviewForm)
