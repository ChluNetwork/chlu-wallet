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
    <br/>
    <Field
      name='comment'
      placeholder='Comment'
      type='text'
      component={Input}
      multiline
      fullWidth
    />
    <div>
      <Button
        type='submit'
        disabled={isLoading || pristine || submitFailed}
      >
        {submitFailed ? 'Error' : (isLoading ? 'Loading...' : 'Save')}
      </Button>
      <Button
        onClick={handleCancel}
        disabled={isLoading}
      >Cancel</Button>
    </div>
  </form>
)

export default reduxForm({ form: 'edit-review-form' })(EditReviewForm)
