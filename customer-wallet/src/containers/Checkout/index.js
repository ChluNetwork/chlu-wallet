import React from 'react'
// components
import HeaderSection from './sections/HeaderSection'
import PaySection from './sections/PaySection'
import ProductSection from './sections/ProductSection'
// styles
import './styles.css'

const Checkout = () => (
  <div className='page-container checkout'>
    <h3>Checkout at Etsy</h3>
    <div className='checkout-seller'>
      <HeaderSection />
      <span className='checkout-seller__header-info'>
        (250 Reviews, Over $250,000 sales)
      </span>
      <ProductSection />
      <PaySection />
    </div>
  </div>
)

export default Checkout
