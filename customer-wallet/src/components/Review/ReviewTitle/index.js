import React from 'react'
import { string, number } from 'prop-types'
//components
import StarRatingComponent from 'react-star-rating-component'
// styles
import style from 'styles/inlineStyles/containers/Vendor/vendorWallet'
import './style.css'
// constants
const { ratingStyle } = style

const starCount = 5

const ReviewTitle = ({ comment, date, rating }) => (
  <div className='review-comment'>
    <div className='review-comment__head'>
      <StarRatingComponent
        {...ratingStyle}
        className='comment-rating'
        name='rating'
        value={rating}
        starCount={starCount}
        editing={false}
      />
      {date && <div className='comment-date'>{date}</div>}
    </div>
    <div className='review-comment__comment'>{comment}</div>
  </div>
)

ReviewTitle.propTypes = {
  comment: string,
  date: string,
  rating: number
}

export default ReviewTitle
