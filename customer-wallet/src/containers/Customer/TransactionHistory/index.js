import React, { Component } from 'react'
// redux
import { connect } from 'react-redux'
import { actions } from 'shared-libraries/lib'
// libs
import { fx, setFxRates } from 'lib/fxRates'
// components
import TransactionItem from './TransactionItem'
// assets
import transactions from './assets/data'
// styles
import './style.css'
// constants
const { dataActions: {
  fxRates: { getRates }
} } = actions

class TransactionHistory extends Component {
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

  convertBtcToUsd = (value) => fx.convert(value, { from: 'BTC', to: 'USD' }).toFixed(4)

  render() {
    const totalBTC = this.getTotalBtc(transactions)
    const totalUSD = this.convertBtcToUsd(totalBTC)

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
                  <TransactionItem {...transaction} key={index} convertBtcToUsd={this.convertBtcToUsd}/>
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

export default connect(null, mapDispatchToProps)(TransactionHistory)
