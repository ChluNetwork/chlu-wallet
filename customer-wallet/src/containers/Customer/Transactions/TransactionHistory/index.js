import React, { Component } from 'react'
import PropTypes from 'prop-types'
// redux
import { compose } from 'redux'
import { connect } from 'react-redux'
import { getRates } from 'store/modules/data/fxRates'
// hoc
import withTransactionHistory from '../withTransactionHistory'
// libs
import { setFxRates, convertFromBtcToUsd, convertSatoshiToBTC } from 'lib/fxRates'
// components
import TransactionItem from './TransactionItem/index'
// styles
import './style.css'

class TransactionHistory extends Component {
  static propTypes = {
    transactionHistory: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      data: PropTypes.object.isRequired
    }).isRequired,
    groupTransactionByAddress: PropTypes.func.isRequired,
    calculateTotalSpent: PropTypes.func.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired
    }).isRequired,
    getRates: PropTypes.func.isRequired
  }

  componentDidMount () {
    this.getFxRates()
  }

  getFxRates () {
    this.props.getRates()
      .then(data => setFxRates(data))
      .catch(error => console.log(error))
  }

  render() {
    const {
      location: { pathname },
      transactionHistory: { data: { txs } },
      groupTransactionByAddress,
      calculateTotalSpent
    } = this.props

    const groupedTransaction = groupTransactionByAddress(txs)
    const totalBTC = convertSatoshiToBTC(calculateTotalSpent(groupedTransaction, 'totalSpent'))
    const totalUSD = convertFromBtcToUsd(totalBTC)

    return (
      <div className='page-container transaction color-main container-border-top'>
        <div className='section-head container'>
          <div className='transaction-name font-weight-bold'>
            Customer transition history
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
              {
                groupedTransaction.map(({ address, totalSpent }, index) => (
                  <TransactionItem
                    key={index}
                    address={address}
                    pathname={pathname}
                    price={totalSpent}
                  />
                ))
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = {
  getRates
}

const mapStateToProps = state => ({
  location: state.location
})

export default compose(
  withTransactionHistory,
  connect(mapStateToProps, mapDispatchToProps)
)(TransactionHistory)
