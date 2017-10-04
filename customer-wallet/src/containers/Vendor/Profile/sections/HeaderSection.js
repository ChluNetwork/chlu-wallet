import React from 'react'
import PropTypes from 'prop-types'
// components
import StarRatingComponent from 'react-star-rating-component'
import Search from 'material-ui/svg-icons/action/search'
import Close from 'material-ui/svg-icons/navigation/close'
import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton';
// constants
import { ratingColor, borderColorDark, mainColor } from 'context/palette'

const starCount = 5

const searchIconStyle = {
  iconStyle: {
    fill: borderColorDark,
    cursor: 'pointer',
    width: '100%',
    height: '100%'
  },
  style: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 0,
    width: '25px',
    height: '25px'
  }
}

const searchInputStyle = {
  style: { height: '35px' },
  inputStyle: { padding: '0 25px 10px 0' },
  underlineFocusStyle: { borderColor: mainColor },
  autoFocus: true
}

const ProfileHeader = ({ name, rating, titleSold, titleReviews, handleToggleSearchShow, isSearchFieldOpen }) => (
  <div className='profile-header container'>
    <div className='section-head'>
      <div className='profile-header__info'>
        <div className='avatar'>
          {name[0].toUpperCase()}
        </div>
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
        {isSearchFieldOpen && <TextField {...searchInputStyle} fullWidth={true} name='search'/>}
        <IconButton  {...searchIconStyle} onClick={handleToggleSearchShow} >
          {isSearchFieldOpen ? <Close /> : <Search /> }
        </IconButton>
      </div>
    </div>
  </div>
)

ProfileHeader.propTypes = {
  name: PropTypes.string,
  rating: PropTypes.number,
  titleReviews: PropTypes.string,
  titleSold: PropTypes.string,
  handleToggleSearchShow: PropTypes.func.isRequired,
  isSearchFieldOpen: PropTypes.bool
}

export default ProfileHeader
