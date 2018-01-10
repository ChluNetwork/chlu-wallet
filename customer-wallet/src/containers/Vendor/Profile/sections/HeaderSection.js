import React from 'react'
import { string, number, func, bool } from 'prop-types'
// components
import StarRatingComponent from 'react-star-rating-component'
import Search from 'material-ui/svg-icons/action/search'
import Close from 'material-ui/svg-icons/navigation/close'
import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton'
// styles
import style from 'styles/inlineStyles/containers/Vendor/profile'
// constants
const { ratingStyle, searchIconStyle, searchInputStyle } = style

const starCount = 5

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
            {...ratingStyle}
            className='profile-info__rating'
            name='rate2'
            starCount={starCount}
            value={rating}
            editing={false}
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
  name: string,
  rating: number,
  titleReviews: string,
  titleSold: string,
  handleToggleSearchShow: func.isRequired,
  isSearchFieldOpen: bool
}

export default ProfileHeader
