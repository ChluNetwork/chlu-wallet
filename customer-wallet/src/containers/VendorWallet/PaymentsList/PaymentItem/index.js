import React from 'react'
//components
import StarRatingComponent from 'react-star-rating-component'
//assets
import noProduct from '../../assets/no-product.png'

const initialRating = 0;
const starCount = 3;

const PaymentItem = () => (
  <div className='payment-item'>

    <div className='payment-item-head'>
      <div className='info'>
        <img src={noProduct} alt="" className='avatar'/>
        <span className='name'>Shinny New Item</span>
      </div>
      <div className='price'>1.111123 BTC</div>
    </div>

    <div className='payment-item-date'>
      <div className="place">Amazon</div>
      <div className="date">Sept 05,2017</div>
    </div>

    <StarRatingComponent
      className='payment-item-rating'
      name='rating'
      value={initialRating}
      starCount={starCount}
    />
    <div className="payment-item-text">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras bibendum non turpis et sollicitudin.
      Aenean ac turpis ac mi molestie faucibus vitae nec diam. In bibendum sem lorem, et faucibus.
    </div>
  </div>
)

export default PaymentItem
