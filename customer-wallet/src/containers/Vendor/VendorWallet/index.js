import React, { Component } from 'react'
import PropTypes from 'prop-types'
// redux
import { connect } from 'react-redux'
import { getVendorReviews } from 'store/modules/data/vendorWallet'
import { getRates } from 'store/modules/data/fxRates'
// libs
import { fx, setFxRates } from 'lib/fxRates'
// components
import PaymentsList from './PaymentsList/index'
import CircularProgress from 'material-ui/CircularProgress'
// styles
import './styles.css'

class VendorWallet extends Component {

  static propTypes = {
    vendorWalletData: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.any,
      reviews: PropTypes.array.isRequired
    }).isRequired,
    getVendorReviews: PropTypes.func.isRequired
  }

  componentWillMount() {
    this.getFxRates()
  }

  componentDidMount() {
    const { getVendorReviews } = this.props

    getVendorReviews()
  }

  getFxRates () {
    const { getRates } = this.props

    getRates()
      .then(data => setFxRates(data))
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
      vendorWalletData: { reviews, loading: vendorLoading },
      fxRates: { loading: ratesLoading }
    } = this.props

    const totalBtc = this.calculateTotalBtc(reviews)
    const totalUsd = !ratesLoading ? this.getTotalUsd(totalBtc) : null

    return (
      <div className='page-container vendor-wallet'>
        <h3>Vendor Wallet</h3>
        {
          vendorLoading
            ? <CircularProgress />
            : <div>
              <div className='crypto'>
                <h3>{totalBtc} BTC</h3>
                <span>{totalUsd} USD</span>
              </div>
              {
                reviews.map(({ date, reviews }, index) =>
                  <PaymentsList date={date} reviews={reviews} key={index} getTotalUsd={this.getTotalUsd}/>)
              }
            </div>
        }
      </div>
    )
  }
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
