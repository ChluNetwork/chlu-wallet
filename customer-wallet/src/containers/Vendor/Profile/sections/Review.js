import React from 'react'
import PropTypes from 'prop-types'
// components
import StarRatingComponent from 'react-star-rating-component'
// styles
import style from 'styles/inlineStyles/containers/Vendor/profile'
// constants
const { ratingStyle } = style

const starCount = 5

const Review = ({ date, rating, description, price }) => (
  <div className='profile-review container-border-bottom'>
    <div className='profile-review__head'>
      <div className='profile-review__info color-light'>
        <div className='info-date'>{date}</div>
        <div className='info-price'>$ {price}</div>
      </div>
      <StarRatingComponent
        name='rate3'
        starCount={starCount}
        value={rating}
        editing={false}
        {...ratingStyle}
      />
    </div>
    <div className='profile-review__description'>
      {description}
    </div>
  </div>
)

Review.propTypes = {
  date: PropTypes.string,
  rating: PropTypes.number,
  description: PropTypes.string,
  price: PropTypes.number
}

export default Review
