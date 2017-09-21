import React from 'react'
import PropTypes from 'prop-types'
//components
import StarRatingComponent from 'react-star-rating-component'

const starCount = 3

const PaymentItem = ({ productTitle, date, price, rating, review, platform, productPhoto }) => (
  <div className='payment-item'>
    <div className='payment-item-head'>
      <div className='info'>
        <img src={productPhoto} alt='' className='avatar'/>
        <span className='name'>{review}</span>
      </div>
      <div className='price'>{price} BTC</div>
    </div>

    <div className='payment-item-date'>
      <div className='place'>{platform}</div>
      <div className='date'>{date}</div>
    </div>

    <StarRatingComponent
      className='payment-item-rating'
      name='rating'
      value={rating}
      starCount={starCount}
      editing={false}
    />
    <div className='payment-item-text'>{productTitle}</div>
  </div>
)

PaymentItem.propTypes = {
  productTitle: PropTypes.string,
  date: PropTypes.string,
  price: PropTypes.number,
  rating: PropTypes.number,
  review: PropTypes.string,
  platform: PropTypes.string,
  productPhoto: PropTypes.string
}

export default PaymentItem
