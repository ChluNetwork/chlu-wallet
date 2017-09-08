import React from 'react'
// assets
import noProduct from '../assets/no-product.png'

const Product = () => (
  <div className='checkout-seller__product'>
    <img src={noProduct} alt='product' />
    <div className='checkout-seller__product-description'>
      <h5>Shinny New Phone</h5>
      <span>USD 40.00</span>
    </div>
  </div>
)

export default Product
