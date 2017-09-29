import React from 'react'
import PropTypes from 'prop-types'
// components
import StarRatingComponent from 'react-star-rating-component'
// constants
const starCount = 5

const Product = ({ rating, avatar, price, product }) => (
  <div className='product section-content'>
    <div className='product-info'>
      <div className='product-info__name'>{product}</div>
      <div className='product-info__price'>${price}</div>
      <StarRatingComponent
        className='product-info__rating'
        name='rate1'
        starCount={starCount}
        value={rating}
        editing={false}
      />
    </div>
    <div className='product-img'>
      <div className='product-img__wrapper'>
        <img src={avatar} alt={product} className='img'/>
      </div>
    </div>
  </div>
)

Product.propTypes = {
  avatar: PropTypes.string,
  price: PropTypes.number,
  operation: PropTypes.string
}

export default Product
