import React from 'react'
import PropTypes from 'prop-types'
// components
import StarRatingComponent from 'react-star-rating-component'
// constants
import { ratingColor } from 'styles/constants'

const starCount = 5

const ProfileHeader = ({ name, rating, titleSold, titleReviews }) => (
  <div className='profile-header container'>
    <div className='section-head'>
      <div className='profile-header__info'>
        <div className='avatar'>{name[0].toUpperCase()}</div>
        <div className='profile-info'>
          <div className='profile-info__name'>{name}</div>
          <StarRatingComponent
            className='profile-info__rating'
            name='rate2'
            starCount={starCount}
            value={rating}
            editing={false}
            starColor={ratingColor}
          />
          <div className='profile-info__title color-light'>
            <div className='title-reviews'>{titleReviews}</div>
            <div className='title-sold'>{titleSold}</div>
          </div>
        </div>
      </div>
      <div className='profile-header__search'>S</div>
    </div>
  </div>
)

ProfileHeader.propTypes = {
  name: PropTypes.string,
  rating: PropTypes.number,
  titleReviews: PropTypes.string,
  titleSold: PropTypes.string
}

export default ProfileHeader
