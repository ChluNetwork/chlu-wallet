import React from 'react'
import PropTypes from 'prop-types'
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
        className='comment-rating'
        name='rating'
        value={rating}
        starCount={starCount}
        editing={false}
        {...ratingStyle}
      />
      {
        date
          ? <div className='comment-date'>{date}</div>
          : null
      }
    </div>

    <div className='review-comment__comment'>{comment}</div>
  </div>
)

ReviewTitle.propTypes = {
  comment: PropTypes.string,
  date: PropTypes.string,
  rating: PropTypes.number
}

export default ReviewTitle
