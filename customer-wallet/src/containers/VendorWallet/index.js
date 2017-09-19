import React, { Component } from 'react'
import PropTypes from 'prop-types'
// redux
import { connect } from 'react-redux'
import { getVendorReviews } from '../../store/modules/vendorWallet'
// utils
import { getExchangeRates } from 'utils/exchangeReq'
// libs
import { fx } from 'money'
// components
import PaymentsList from './PaymentsList'
// styles
import './VendorWallet.css'
// data
import rates from 'fixtures/rates'

class VendorWallet extends Component {

  state = {
    ratesLoading: true
  }

  componentWillMount () {
    const isTestEnv = process.env.NODE_ENV === 'test'
    isTestEnv ? this.setFxRates(rates) : this.getFxRates()
  }

  componentDidMount() {
    const { getVendorReviews } = this.props

    getVendorReviews()
  }

  getFxRates () {
    getExchangeRates().then((data) => {
      if (data) {
        this.setFxRates(data)
      }

      this.setState({ ratesLoading: false })
    })
  }

  setFxRates (data) {
    fx.rates = data.rates
    fx.base = data.base
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
    const { ratesLoading } = this.state
    const { vendorWallet: { reviews, loading } } = this.props

    const totalBtc = this.calculateTotalBtc(reviews)
    const totalUsd = !ratesLoading ? this.getTotalUsd(totalBtc) : null

    return (
      <div className='vendor-wallet'>
        <h3>Vendor Wallet</h3>
        {
          loading
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
  vendorWallet: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    error: PropTypes.any,
    reviews: PropTypes.array.isRequired
  }).isRequired,
  getVendorReviews: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  vendorWallet: state.vendorWallet
})

const mapDispatchToProps = {
  getVendorReviews
}

export default connect(mapStateToProps, mapDispatchToProps)(VendorWallet)
