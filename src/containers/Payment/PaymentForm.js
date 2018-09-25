import React from 'react'
// components
import { CardHeader, CardContent, CardActions, Grid } from '@material-ui/core'
import { Avatar, Button } from '@material-ui/core'
import { reduxForm, Field } from 'redux-form'
import CustomInput from 'components/Form/CustomInput'
import StarRatingComponent from 'react-star-rating-component'
// icons
import ReviewIcon from '@material-ui/icons/Star'

function PaymentForm({ handleSubmit, onCancel, setRating, rating, starCount, disabled }) {
  return <form onSubmit={handleSubmit}>
        <CardHeader
            avatar={<Avatar><ReviewIcon/></Avatar>}
            title='Leave a Chlu Review'
            subheader='The review will be included with the payment. You will be able to edit the review later'
        />
        <CardContent>
            <Grid container spacing={16}>
                <Grid item xs={12}>
                    <StarRatingComponent
                        className='review-rating'
                        name='rating'
                        starCount={starCount}
                        value={rating}
                        editing={!disabled}
                        onStarClick={rating => setRating(rating)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Field
                        name='title'
                        labelText={<span>Summary</span>}
                        component={CustomInput}
                        disabled={disabled}
                        formControlProps={{ fullWidth: true }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Field
                        name='review'
                        labelText={<span>Detailed Review</span>}
                        component={CustomInput}
                        disabled={disabled}
                        formControlProps={{ fullWidth: true }}
                    />
                </Grid>
            </Grid>
        </CardContent>
        <CardActions>
            <Button type='submit' disabled={disabled}>Pay</Button>
            <Button onClick={onCancel}>Cancel</Button>
        </CardActions>
    </form>
}

export default reduxForm({
  form: 'payment-form'
})(PaymentForm)
