import React, { Component } from 'react'
import { shape, bool, any, object, func } from 'prop-types'
import moment from 'moment'
// redux
import { connect } from 'react-redux'
import { compose } from 'redux'
// helpers
import { formatCurrency } from 'helpers/currencyFormat'
import { get, groupBy } from 'lodash'
import { types } from 'helpers/ipfs';
// hoc
import withFxRates from 'containers/Hoc/withFxRates'
import WithChluIPFS from 'containers/Hoc/WithChluIPFS';
import withVendorTransactions from 'containers/Hoc/withVendorTransactions'
// components
import ReviewsList from './ReviewsList'
import Avatar from '@material-ui/core/Avatar'

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
      reviews: { reviews }
    } = this.props

    const transactions = get(data, 'txs', [])
      .map(tx => {
        tx.shortDate = moment(tx.received).format('MMMM YYYY')
        return tx
      })
    const combineTransactions = groupBy(transactions, tx => tx.shortDate)
    const totalBtc = this.calculateTotalBtc(get(data, 'txs', []))
    const totalBits = convertFromBtcToBits(totalBtc, 2)
    const totalUsd = convertFromBtcToUsd(totalBtc)
    const totalBitsFormatted = formatCurrency(totalBits)
    const totalUsdFormatted = formatCurrency(totalUsd)

    return (
      <div>
        {Object.keys(combineTransactions).map((key, index) =>
          <ReviewsList
            key={index}
            date={key}
            transactions={combineTransactions[key]}
            reviews={reviews}
            convertSatoshiToBits={convertSatoshiToBits}
            convertFromBitsToUsd={convertFromBitsToUsd}
          />)}
      </div>
    )
  }
}

export default compose(
  WithChluIPFS(types.vendor),
  withFxRates,
  withVendorTransactions,
  connect(mapStateToProps)
)(VendorWallet)
