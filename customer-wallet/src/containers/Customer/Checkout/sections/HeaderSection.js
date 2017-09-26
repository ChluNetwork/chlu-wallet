import React from 'react'
import PropTypes from 'prop-types'
// components
import { Link } from 'react-router'
import StarRatingComponent from 'react-star-rating-component'
// constants
const starCount = 5

const SellerHeader = ({ name, rating }) => (
  <div className='checkout-vendor__header'>
    <Link to='#' className='checkout-vendor__header-name'>{name}</Link>
    <StarRatingComponent
      name='rate1'
      starCount={starCount}
      value={rating}
      editing={false}
    />
  </div>
)

SellerHeader.propTypes = {
  name: PropTypes.string,
  rating: PropTypes.number
}

export default SellerHeader
