import React from 'react'
// components
import { Link } from 'react-router'
import StarRatingComponent from 'react-star-rating-component'
// constants
const starCount = 5
const starValue = 4

const ProfileHeader = () => (
  <div className='profile-header'>
    <div>
      <Link to='#' className='profile-header__name'>
        Awesome seller
      </Link>
    </div>
    <StarRatingComponent
      name="rate2"
      starCount={starCount}
      value={starValue}
      editing={false}
    />
    <br />
    <span className='profile-header__info'>(250 Reviews, Over $250,000 sales)</span>
  </div>
)

export default ProfileHeader
