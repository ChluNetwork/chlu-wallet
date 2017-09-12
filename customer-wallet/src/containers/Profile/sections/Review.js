import React from 'react'
import PropTypes from 'prop-types'
// components
import StarRatingComponent from 'react-star-rating-component'
// constants
const starCount = 5

const Review = ({ date, rating, description, price }) => (
  <div className='profile-review__wrapper'>
    <div className='profile-review__header'>
      <div className='profile-review__price'>
        <span>{date}</span>
        <br />
        <span>$ {price}</span>
      </div>
      <StarRatingComponent
        name="rate3"
        starCount={starCount}
        value={rating}
        editing={false}
      />
    </div>
    <div>
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
