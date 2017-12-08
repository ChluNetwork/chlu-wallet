import React, { Component } from 'react'
import { shape, bool, object, func, string, any } from 'prop-types'
// helpers
import get from 'lodash/get'
// redux
import { compose } from 'redux'
import { connect } from 'react-redux'
// hoc
import withCustomerTransactions from '../../../withCustomerTransactions'
import withFxRates from '../../../withFxRates'
// components
import TransactionItem from './TransactionItem/index'
// styles
import './style.css'

class TransactionHistory extends Component {
  static propTypes = {
    customerTransactions: shape({
      loading: bool,
      error: any,
      data: object
    }),
    groupTransactionByAddress: func,
    calculateTotalSpent: func,
    location: shape({ pathname: string }),
    getRates: func,
    convertSatoshiToBTC: func,
    convertFromBtcToUsd: func,
    convertFromUsdToBtc: func
  }

  render() {
    const {
      location,
      customerTransactions,
      groupTransactionByAddress,
      calculateTotalSpent,
      convertSatoshiToBTC,
      convertFromBtcToUsd
    } = this.props

    const groupedTransaction = groupTransactionByAddress(get(customerTransactions, 'data.txs', []))
    const totalBTC = convertSatoshiToBTC(calculateTotalSpent(groupedTransaction, 'totalSpent'))
    const totalUSD = convertFromBtcToUsd(totalBTC)

    return (
      <div className='page-container transaction color-main container-border-top'>
        <div className='section-head container'>
          <div className='transaction-name font-weight-bold'>
            Customer transaction history
          </div>
          <div className='transaction-spent'>
            <div className='transaction-spent__title font-weight-bold'>Total Spent</div>
            <div className='transaction-spent__price'>
              <div className='price-item font-weight-bold'>{totalBTC} BTC</div>
              <div className='price-item font-smaller'>{totalUSD} USD</div>
            </div>
          </div>
        </div>
        <div className='section-content'>
          <div className='container'>
            <div className='transaction-list'>
              {groupedTransaction.map(({ address, totalSpent }, index) => (
                <TransactionItem
                  key={index}
                  address={address}
                  pathname={get(location, 'pathname', '')}
                  price={totalSpent}
                  convertFromBtcToUsd={convertFromBtcToUsd}
                  convertSatoshiToBTC={convertSatoshiToBTC}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  location: state.location
})

export default compose(
  withFxRates,
  withCustomerTransactions,
  connect(mapStateToProps)
)(TransactionHistory)
