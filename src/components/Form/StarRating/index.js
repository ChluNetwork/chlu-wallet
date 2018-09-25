import React from 'react'
import StarRatingComponent from 'react-star-rating-component'

const starCount = 5

export default function StarRatingField ({ input: { value, onChange, ...inputRest }, ...rest }) {
  return <StarRatingComponent
    starCount={starCount}
    value={value}
    onStarClick={onChange}
    {...inputRest}
    {...rest}
  />
}