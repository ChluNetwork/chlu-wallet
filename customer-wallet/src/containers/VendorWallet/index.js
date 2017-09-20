import React, { Component } from 'react'
import PropTypes from 'prop-types'
// redux
import { connect } from 'react-redux'
import { getVendorReviews } from 'store/modules/data/vendorWallet'
import { getRates } from 'store/modules/data/fxRates'
// libs
import { fx } from 'money'
// components
import PaymentsList from './PaymentsList'
// styles
import './VendorWallet.css'

class VendorWallet extends Component {
  componentWillMount() {
    const { fxRates: { rates } } = this.props

    const isTestEnv = process.env.NODE_ENV === 'test'
    isTestEnv ? this.setFxRates(rates) : this.getFxRates()
  }

  componentDidMount() {
    const { getVendorReviews } = this.props

    getVendorReviews()
  }

  getFxRates () {
    const { getRates } = this.props

    getRates()
  }

  setFxRates ({ rates, base }) {
    fx.rates = rates
    fx.base = base
  }

  calculateBtcForMonth = data => {
    if(data && data.length){
      return data.reduce((previousValue, { price }) => previousValue + price, 0)
    }

    return 0
  }


  calculateTotalBtc = data => {
    if (data && data.length) {
      return data.reduce((previousValue, { reviews }) => previousValue + this.calculateBtcForMonth(reviews), 0)
    }

    return 0
  }

  getTotalUsd = (value) => fx.convert(value, { from: 'BTC', to: 'USD' }).toFixed(4)

  render () {
    const {
      vendorWalletData: { reviews, loading: vendorloading },
      fxRates: { rates, loading: ratesLoading }
    } = this.props

    this.setFxRates(rates)

    const totalBtc = this.calculateTotalBtc(reviews)
    const totalUsd = !ratesLoading ? this.getTotalUsd(totalBtc) : null

    return (
      <div className='vendor-wallet'>
        <h3>Vendor Wallet</h3>
        {
          vendorloading
            ? 'Loading...'
            : <div>
              <div className='crypto'>
                <h3>{totalBtc} BTC</h3>
                <span>{totalUsd} USD</span>
              </div>
              {
                reviews.map(({ date, reviews }, index) => <PaymentsList date={date} reviews={reviews} key={index}/>)
              }
            </div>
        }
      </div>
    )
  }
}

VendorWallet.propTypes = {
  vendorWalletData: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    error: PropTypes.any,
    reviews: PropTypes.array.isRequired
  }).isRequired,
  getVendorReviews: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  vendorWalletData: state.data.vendorWallet,
  fxRates: state.data.fxRates
})

const mapDispatchToProps = {
  getVendorReviews,
  getRates
}

export default connect(mapStateToProps, mapDispatchToProps)(VendorWallet)
