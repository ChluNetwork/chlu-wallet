import React from 'react'
import PropTypes from 'prop-types'
//components
import StarRatingComponent from 'react-star-rating-component'
// styles
import style from 'styles/inlineStyles/containers/Vendor/vendorWallet'
// constants
const { ratingStyle } = style

const starCount = 5

const PaymentItem = ({ productTitle, date, price, rating, review, platform, productPhoto, getTotalUsd }) => {
  const priceInUsd = getTotalUsd(price)

  return (
    <div className='payment-item container-border-bottom'>
      <div className='payment-item__avatar'>
        <img src={productPhoto} alt='' className='avatar'/>
      </div>

      <div className='payment-item__info'>

        <div className='info-head-wrapper'>
          <div className='info-head'>
            <div className='info-head__name'>{review}</div>
            <div className='info-head__date color-light'>
              <div className='date'>{date}</div>
              <div className='platform'>{platform}</div>
            </div>
          </div>
          <div className='info-head__price'>
            <div className='price-item'>{price} BTC</div>
            <div className='price-item'>{priceInUsd} USD</div>
          </div>
        </div>

        <StarRatingComponent
          className='info-rating'
          name='rating'
          value={rating}
          starCount={starCount}
          editing={false}
          {...ratingStyle}
        />

        <div className='info-title'>{productTitle}</div>
      </div>
    </div>
  )
}

PaymentItem.propTypes = {
  productTitle: PropTypes.string,
  date: PropTypes.string,
  price: PropTypes.number,
  rating: PropTypes.number,
  review: PropTypes.string,
  platform: PropTypes.string,
  productPhoto: PropTypes.string,
  getTotalUsd: PropTypes.func.isRequired
}

export default PaymentItem
