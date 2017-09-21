import React from 'react'
import PropTypes from 'prop-types'
//components
import PaymentItem from './PaymentItem/index'

const PaymentsList = ({ date, reviews }) => (
  <div className='payments-list'>
    <div className='period'>{date}</div>
    {
      reviews.map((review, index) => <PaymentItem {...review} key={index}/>)
    }
  </div>
)

PaymentsList.propTypes = {
  date: PropTypes.string.isRequired,
  reviews: PropTypes.array.isRequired
}

export default PaymentsList
