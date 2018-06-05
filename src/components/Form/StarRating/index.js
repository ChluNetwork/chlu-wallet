import React from 'react'
import StarRatingComponent from 'react-star-rating-component'

const starCount = 5

export default function StarRatingField ({ input, ...rest }) {
  return <StarRatingComponent
    className='edit-form__rating'
    name='rating'
    starCount={starCount}
    value={input.value}
    onStarClick={input.onChange}
    {...rest}
  />
}