import React, { Component } from 'react'
import { shape, bool, object, func, string, any } from 'prop-types'
// helpers
import get from 'lodash/get'
// redux
import { compose } from 'redux'
import { connect } from 'react-redux'
// hoc
import withCustomerTransactions from '../../../Hoc/withCustomerTransactions'
import withFxRates from '../../../Hoc/withFxRates'
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
    location: shape({ pathname: string }),
    getRates: func,
    convertFromBitsToUsd: func,
    convertSatoshiToBits: func,
  }

  render() {
    const {
      location,
      customerTransactions,
      groupTransactionByAddress,
      convertSatoshiToBits,
      convertFromBitsToUsd
    } = this.props

    const groupedTransaction = groupTransactionByAddress(get(customerTransactions, 'data.txs', []))
    return (
      <div className='page-container transaction color-main container-border-top'>
        <div className='section-head container'>
          <div className='transaction-name font-weight-bold'>
            Customer transaction history
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
                  convertSatoshiToBits={convertSatoshiToBits}
                  convertFromBitsToUsd={convertFromBitsToUsd}
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
