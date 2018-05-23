import React from 'react'
import { string, number } from 'prop-types'
//components
import StarRatingComponent from 'react-star-rating-component'

const starCount = 5

const ReviewTitle = ({ comment, date, rating }) => (
  <div className='review-comment'>
    <div className='review-comment__head'>
      {rating > 0 && <StarRatingComponent
        className='comment-rating'
        name='rating'
        value={rating}
        starCount={starCount}
        editing={false}
      />}
      {date && <div className='comment-date'>{date}</div>}
    </div>
    <div className='review-comment__comment'>{comment || '(No comment left)'}</div>
  </div>
)

ReviewTitle.propTypes = {
  comment: string,
  date: string,
  rating: number
}

export default ReviewTitle
