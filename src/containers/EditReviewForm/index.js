import React from 'react'
// libs
import { reduxForm, Field } from 'redux-form'
// components
import StarRating from 'components/Form/StarRating'
import CustomInput from 'components/Form/CustomInput'
import { Button, Grid } from '@material-ui/core'

const EditReviewForm = ({ handleSubmit, handleCancel, isLoading, pristine, submitFailed }) => (
  <form onSubmit={handleSubmit}>
    <Grid container spacing={16}>
      <Grid item xs={12}>
        <Field
          name='rating'
          component={StarRating}
          disabled={isLoading}
        />
      </Grid>
      <Grid item xs={12}>
        <Field
          name='title'
          component={CustomInput}
          labelText={<span>Summary</span>}
          formControlProps={{ fullWidth: true }}
          disabled={isLoading}
        />
      </Grid>
      <Grid item xs={12}>
        <Field
          name='comment'
          labelText={<span>Detailed Review</span>}
          component={CustomInput}
          formControlProps={{ fullWidth: true }}
          disabled={isLoading}
        />
      </Grid>
    </Grid>
    <div>
      <Button
        type='submit'
        disabled={isLoading || pristine || submitFailed}
      >
        {submitFailed ? 'Error' : (isLoading ? 'Saving...' : 'Save')}
      </Button>
      <Button
        onClick={handleCancel}
        disabled={isLoading}
      >Cancel</Button>
    </div>
  </form>
)

export default reduxForm({ form: 'edit-review-form' })(EditReviewForm)
