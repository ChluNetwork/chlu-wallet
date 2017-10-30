import React from 'react'
import PropTypes from 'prop-types'
//components
import Review from 'components/Review'

const PaymentsList = ({ date, reviews, getTotalUsd }) => (
  <div className='reviews-list'>
    <div className='reviews-list__date color-light'>{date}</div>
    {
      reviews.map((review, index) => <Review {...review} getTotalUsd={getTotalUsd} key={index}/>)
    }
  </div>
)

PaymentsList.propTypes = {
  date: PropTypes.string.isRequired,
  reviews: PropTypes.array.isRequired,
  getTotalUsd: PropTypes.func
}

export default PaymentsList
