import React, { Component } from 'react'
import { shape, bool, any, object, func } from 'prop-types'
// redux
import { connect } from 'react-redux'
import { compose } from 'redux'
// helpers
import { formatCurrency } from 'helpers/currencyFormat'
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
    convertSatoshiToBits: func,
    convertFromBitsToUsd: func,
    convertFromBtcToBits: func
  }

  calculateTotalBtc = (data) =>
    data.reduce((previousValue, { total }) => previousValue + parseFloat(this.props.convertSatoshiToBTC(total)), 0)

  render () {
    const {
      convertFromBtcToUsd,
      convertSatoshiToBits,
      convertFromBtcToBits,
      convertFromBitsToUsd,
      vendorTransaction: { data },
      profile: { data: profileData }
    } = this.props

    const combineTransactions = groupBy(get(data, 'txs', []), (item) => item.shortDate)
    const totalBtc = this.calculateTotalBtc(get(data, 'txs', []))
    const totalBits = convertFromBtcToBits(totalBtc, 2)
    const totalUsd = convertFromBtcToUsd(totalBtc)
    const totalBitsFormatted = formatCurrency(totalBits)
    const totalUsdFormatted = formatCurrency(totalUsd)

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
             <div className='total-crypto__item big'>{totalBitsFormatted} bits</div>
             <div className='total-crypto__item'>${totalUsdFormatted} USD</div>
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
                convertSatoshiToBits={convertSatoshiToBits}
                convertFromBitsToUsd={convertFromBitsToUsd}
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
