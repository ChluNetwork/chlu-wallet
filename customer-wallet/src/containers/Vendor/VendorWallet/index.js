import React, { Component } from 'react'
import PropTypes from 'prop-types'
// redux
import { connect } from 'react-redux'
import { actions } from 'shared-libraries/lib'
// libs
import { setFxRates, convertFromBtcToUsd } from 'lib/fxRates'
// components
import ReviewsList from './ReviewsList'
import CircularProgress from 'material-ui/CircularProgress'
import Avatar from 'material-ui/Avatar'
// styles
import './styles.css'
import style from 'styles/inlineStyles/containers/Vendor/vendorWallet'
// constants
const { dataActions: {
  vendorWallet: { getVendorReviews },
  fxRates: { getRates }
} } = actions

const { avatarStyle } = style

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
      .catch(error => console.log(error))
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

  render () {
    const {
      vendorWalletData: { reviews, loading: vendorLoading },
      fxRates: { loading: ratesLoading },
      profile: { data }
    } = this.props

    const totalBtc = this.calculateTotalBtc(reviews)
    const totalUsd = !ratesLoading ? convertFromBtcToUsd(totalBtc) : null
    const userName = data ? data.name : 'c'

    return (
      <div className='page-container vendor-wallet color-main'>
        {
          vendorLoading
            ? <CircularProgress />
            : <div>
              <div className='section-head '>
                <div className='container'>
                 <div className='section-name color-light'>
                   <div className='name'>Vendor Wallet</div>
                   <div className='avatar'>
                     <Avatar
                       {...avatarStyle}
                       size={40}
                     >
                       {userName[0].toUpperCase()}
                     </Avatar>
                   </div>
                 </div>
                 <div className='total-crypto'>
                   <div className='total-crypto__item big'>{totalBtc} BTC</div>
                   <div className='total-crypto__item'>${totalUsd} USD</div>
                  </div>
                </div>
              </div>
              <div className='section-content'>
                <div className='container'>
                  {
                    reviews.map(({ date, reviews }, index) =>
                     <ReviewsList date={date} reviews={reviews} key={index} getTotalUsd={this.getTotalUsd}/>)
                  }
                </div>
              </div>
            </div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  profile: state.data.profile,
  vendorWalletData: state.data.vendorWallet,
  fxRates: state.data.fxRates
})

const mapDispatchToProps = {
  getVendorReviews,
  getRates
}

export default connect(mapStateToProps, mapDispatchToProps)(VendorWallet)
