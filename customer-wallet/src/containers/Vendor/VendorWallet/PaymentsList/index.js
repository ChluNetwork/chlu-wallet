import React from 'react'
import PropTypes from 'prop-types'
//components
import PaymentItem from './PaymentItem/index'

const PaymentsList = ({ date, reviews, getTotalUsd }) => (
  <div className='payments-list'>
    <div className='period'>{date}</div>
    {
      reviews.map((review, index) => <PaymentItem {...review} getTotalUsd={getTotalUsd} key={index}/>)
    }
  </div>
)

PaymentsList.propTypes = {
  date: PropTypes.string.isRequired,
  reviews: PropTypes.array.isRequired,
  getTotalUsd: PropTypes.func
}

export default PaymentsList
