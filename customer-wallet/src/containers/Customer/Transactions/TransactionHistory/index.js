import React, { Component } from 'react'
import PropTypes from 'prop-types'
// redux
import { connect } from 'react-redux'
import { actions } from 'shared-libraries/lib'
// libs
import { setFxRates, convertFromBtcToUsd } from 'lib/fxRates'
// components
import TransactionItem from './TransactionItem/index'
// assets
import transactions from '../assets/data'
// styles
import './style.css'
// constants
const { dataActions: {
  fxRates: { getRates }
} } = actions

class TransactionHistory extends Component {

  static propTypes = {
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired
    }).isRequired
  }

  componentDidMount () {
    this.getFxRates()
  }

  getFxRates () {
    const { getRates } = this.props

    getRates()
      .then(data => setFxRates(data))
      .catch(error => console.log(error))
  }

  getTotalBtc = array => {
    if(Array.isArray(array) && array.length) {
      return array.reduce((previousValue, { price }) => previousValue + price, 0)
    }

    return 0
  }

  render() {
    const { location: { pathname } } = this.props
    const totalBTC = this.getTotalBtc(transactions)
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
                transactions.map((transaction, index) =>
                  <TransactionItem
                    key={index}
                    {...transaction}
                    pathname={pathname}
                  />
                )
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

export default connect(mapStateToProps, mapDispatchToProps)(TransactionHistory)
