import React, { Component } from 'react'
import { shape, bool, any, object, func } from 'prop-types'
// redux
import { connect } from 'react-redux'
import { compose } from 'redux'
// helpers
import { get, groupBy } from 'lodash'
// hoc
import withFxRates from 'containers/Hoc/withFxRates'
import withVendorTransactions from 'containers/Hoc/withVendorTransactions'
// components
import ReviewsList from './ReviewsList'
import Avatar from 'material-ui/Avatar'
// styles
import './styles.css'
import style from 'styles/inlineStyles/containers/Vendor/vendorWallet'
// constants
const { avatarStyle } = style

class VendorWallet extends Component {
  static propTypes = {
    vendorTransaction: shape({
      loading: bool,
      error: any,
      data: object
    }),
    profile: shape({
      loading: bool,
      error: any,
      data: object
    }),
    convertSatoshiToBTC: func,
    convertFromBtcToUsd: func,
    convertFromUsdToBtc: func
  }

  calculateTotalBtc = (data) =>
    data.reduce((previousValue, { total }) => previousValue + parseFloat(this.props.convertSatoshiToBTC(total)), 0)

  render () {
    const {
      convertFromBtcToUsd,
      convertSatoshiToBTC,
      vendorTransaction: { data },
      profile: { data: profileData }
    } = this.props

    const combineTransactions = groupBy(get(data, 'txs', []), (item) => item.shortDate)
    const totalBtc = this.calculateTotalBtc(get(data, 'txs', []))
    const totalUsd = convertFromBtcToUsd(totalBtc)

    return (
      <div className='page-container vendor-wallet color-main'>
        <div className='section-head '>
          <div className='container'>
           <div className='section-name color-light'>
             <div className='name'>Vendor Wallet</div>
             <div className='avatar'>
               <Avatar
                 {...avatarStyle}
                 size={40}
               >
                 {get(profileData, 'name', 'c')[0].toUpperCase()}
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
            {Object.keys(combineTransactions).map((key, index) =>
              <ReviewsList
                key={index}
                date={key}
                transactions={combineTransactions[key]}
                convertSatoshiToBTC={convertSatoshiToBTC}
                convertFromBtcToUsd={convertFromBtcToUsd}
              />)}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  profile: state.data.profile
})

export default compose(
  withFxRates,
  withVendorTransactions,
  connect(mapStateToProps)
)(VendorWallet)
