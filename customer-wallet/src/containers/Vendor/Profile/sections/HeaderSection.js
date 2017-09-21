import React from 'react'
import PropTypes from 'prop-types'
// components
import { Link } from 'react-router'
import StarRatingComponent from 'react-star-rating-component'
// constants
const starCount = 5

const ProfileHeader = ({ name, rating, title }) => (
  <div className='profile-header'>
    <div>
      <Link to='#' className='profile-header__name'>{name}</Link>
    </div>
    <StarRatingComponent
      name='rate2'
      starCount={starCount}
      value={rating}
      editing={false}
    />
    <br />
    <span className='profile-header__info'>({title})</span>
  </div>
)

ProfileHeader.propTypes = {
  name: PropTypes.string,
  rating: PropTypes.number,
  title: PropTypes.string
}

export default ProfileHeader
