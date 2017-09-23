import React from 'react'
// components
import CustomerWallet from 'containers/Customer/CustomerWallet'
import VendorWallet from 'containers/Vendor/VendorWallet'
// styles
import './demo.css'

const Demo = () => (
  <div className='demo'>
    <div className='wallets-container'>
      <div className='wallets-container__item'><CustomerWallet /></div>
      <div className='wallets-container__item'><VendorWallet /></div>
    </div>
    <div className='demo-logging'>DEMO DEMO DEMO</div>
  </div>
)

export default Demo
