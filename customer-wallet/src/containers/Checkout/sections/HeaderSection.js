import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
// components
import { Link } from 'react-router'
import StarRatingComponent from 'react-star-rating-component'
// constants
const starCount = 5

const SellerHeader = ({ checkout: { rating } }) => (
  <div className='checkout-seller__header'>
    <Link to='#' className='checkout-seller__header-name'>
      Awesome seller
    </Link>
    <StarRatingComponent
      name='rate1'
      starCount={starCount}
      value={rating}
      editing={false}
    />
  </div>
)

SellerHeader.propTypes = {
  checkout: PropTypes.shape({
    rating: PropTypes.number.isRequired
  }).isRequired
}

const mapStateToProps = state => ({
  checkout: state.components.checkout
})

export default connect(mapStateToProps)(SellerHeader)
