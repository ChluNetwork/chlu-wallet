import React from 'react'
import PropTypes from 'prop-types'

const Product = ({ avatar, price, operation }) => (
  <div className='checkout-vendor__product'>
    <img src={avatar} alt='product' />
    <div className='checkout-vendor__product-description'>
      <h5>{operation}</h5>
      <span>USD {price}</span>
    </div>
  </div>
)

Product.propTypes = {
  avatar: PropTypes.string,
  price: PropTypes.number,
  operation: PropTypes.string
}

export default Product
