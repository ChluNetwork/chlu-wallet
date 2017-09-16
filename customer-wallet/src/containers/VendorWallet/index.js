import React from 'react'
//components
import PaymentsList from './PaymentsList'
//styles
import './VendorWallet.css'
//data
import data from './assets/data'

const VendorWallet = () => (
  <div className="vendor-wallet">
    <h3>Vendor Wallet</h3>
    <div className="crypto">
      <h3>14.2332 BTC</h3>
      <span>12345.67 USD</span>
    </div>
    {
      data.map(({date, reviews}, index) => <PaymentsList date={date} reviews={reviews} key={index}/>)
    }
  </div>
)

export default VendorWallet
