import React from 'react'
import PropTypes from 'prop-types'
// components
import StarRatingComponent from 'react-star-rating-component'
import Search from 'material-ui/svg-icons/action/search'
import Avatar from 'material-ui/Avatar'
// constants
import { ratingColor, borderColorDark, blue, borderColor } from 'context/palette'

const starCount = 5

const style = {
  color: borderColorDark,
  cursor: 'pointer'
}

const avatarStyles = {
  backgroundColor: 'rgb(255, 255, 255)',
  color: blue,
  size: 80,
  style: {
    fontSize: '40pt',
    marginRight: '10px',
    border: `1px solid ${borderColor}`
  }
}

const ProfileHeader = ({ name, rating, titleSold, titleReviews }) => (
  <div className='profile-header container'>
    <div className='section-head'>
      <div className='profile-header__info'>
        <Avatar
          className='avatar'
          {...avatarStyles}
        >
          {name[0].toUpperCase()}
        </Avatar>
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
      <div className='profile-header__search'>
        <Search style={style} />
      </div>
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
