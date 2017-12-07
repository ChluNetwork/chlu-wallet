import React, { Component } from 'react'
import PropTypes from 'prop-types'
// helpers
import get from 'lodash/get'
// redux
import { compose } from 'redux'
import { connect } from 'react-redux'
import { getRates } from 'store/modules/data/fxRates'
import { getTransactionHistory } from 'store/modules/data/transactionHistory'
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
    getRates: PropTypes.func.isRequired,
    address: PropTypes.string,
    getTransactionHistory: PropTypes.func.isRequired
  }

  unconfirmed = new WebSocket('wss://socket.blockcypher.com/v1/btc/main')
  confirmed = new WebSocket('wss://socket.blockcypher.com/v1/btc/main')

  componentDidMount () {
    const { address } = this.props

    this.getFxRates()

    // confirmed
    this.confirmed.onmessage = (event) => {
      const data = JSON.parse(get(event, 'data', '{}'))
      getTransactionHistory(address)
      console.log('updated', data)
    }

    this.confirmed.onopen = () => {
      this.confirmed.send(JSON.stringify({
        event: 'confirmed-tx',
        address
      }))
    }

    // unconfirmed
    this.unconfirmed.onmessage = this.confirmed.onmessage

    this.unconfirmed.onopen = () => {
      this.unconfirmed.send(JSON.stringify({
        event: 'unconfirmed-tx',
        address
      }))
    }
  }

  componentWillUnmount () {
    this.unconfirmed.close()
    this.confirmed.close()
  }

  getFxRates () {
    this.props.getRates()
      .then(data => setFxRates(data))
      .catch(error => console.log(error))
  }

  render() {
    const {
      location,
      transactionHistory,
      groupTransactionByAddress,
      calculateTotalSpent
    } = this.props

    const groupedTransaction = groupTransactionByAddress(get(transactionHistory, 'data.txs', []))
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
                    pathname={get(location, 'pathname', '')}
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
  getRates,
  getTransactionHistory
}

const mapStateToProps = state => ({
  location: state.location
})

export default compose(
  withTransactionHistory,
  connect(mapStateToProps, mapDispatchToProps)
)(TransactionHistory)
