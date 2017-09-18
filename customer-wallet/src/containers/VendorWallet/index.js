import React, { Component } from 'react'
// utils
import { getExchangeRates } from 'utils/exchangeReq'
// libs
import { fx } from 'money'
// components
import PaymentsList from './PaymentsList'
// styles
import './VendorWallet.css'
// data
import data from './assets/data'

class VendorWallet extends Component {

  componentWillMount () {
    getExchangeRates().then((data) => {
      if (data) {
        fx.rates = data.rates
        fx.base = data.base
      }
    })
  }

  getTotalUsd = (value) => fx.convert(value, { from: 'BTC', to: 'USD' }).toFixed(4)

  render () {
    const totalUsd = this.getTotalUsd(data.total)
    return (
      <div className="vendor-wallet">
        <h3>Vendor Wallet</h3>
        <div className="crypto">
          <h3>{data.total} BTC</h3>
          <span>{totalUsd} USD</span>
        </div>
        {
          data.reviews.map(({date, reviews}, index) => <PaymentsList date={date} reviews={reviews} key={index}/>)
        }
      </div>
    )
  }
}

export default VendorWallet
