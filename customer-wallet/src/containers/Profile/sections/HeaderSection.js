import React, { Component } from 'react'
// components
import { Link } from 'react-router'
import StarRatingComponent from 'react-star-rating-component'
// constants
const starCount = 5

export default class ProfileHeader extends Component {

  state = { rating: 4 }

  handleStarChange = (nextValue) => {
    this.setState({ rating: nextValue })
  }

  render () {
    const { rating } = this.state
    return (
      <div className='profile-header'>
        <div>
          <Link to='#' className='profile-header__name'>
            Awesome seller
          </Link>
        </div>
        <StarRatingComponent
          name="rate2"
          starCount={starCount}
          value={rating}
          onStarClick={this.handleStarChange}
        />
        <br />
        <span className='profile-header__info'>(250 Reviews, Over $250,000 sales)</span>
      </div>
    )
  }
}
