import React, { Component } from 'react'
// components
import { Link } from 'react-router'
import StarRatingComponent from 'react-star-rating-component'
// constants
const starCount = 5

export default class SellerHeader extends Component {

  state = { rating: 4 }

  handleStarChange = (nextValue) => {
    this.setState({ rating: nextValue })
  }

  render () {
    const { rating } = this.state
    return (
      <div className='checkout-seller__header'>
        <Link to='#' className='checkout-seller__header-name'>
          Awesome seller
        </Link>
        <StarRatingComponent
          name="rate1"
          starCount={starCount}
          value={rating}
          onStarClick={this.handleStarChange}
        />
      </div>
    )
  }
}
