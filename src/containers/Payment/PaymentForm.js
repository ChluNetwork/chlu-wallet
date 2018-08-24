import React from 'react'
// components
import { CardHeader, CardContent, CardActions } from '@material-ui/core'
import { Avatar, Button } from '@material-ui/core'
import { reduxForm, Field } from 'redux-form'
import Input from 'components/Form/Input'
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
            <StarRatingComponent
                className='review-rating'
                name='rating'
                starCount={starCount}
                value={rating}
                editing={!disabled}
                onStarClick={rating => setRating(rating)}
            />
            <Field
                name='review'
                type='text'
                component={Input}
                placeholder='Review'
                disabled={disabled}
                fullWidth
                multiline
            />
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
