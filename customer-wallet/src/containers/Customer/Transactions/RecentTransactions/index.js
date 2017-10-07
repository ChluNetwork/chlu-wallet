import React, { Component } from 'react'
import { Link } from 'react-router'
// components
import Review from 'components/Review'
// libs
import { convertFromBtcToUsd } from 'lib/fxRates'
// assets
import transaction from '../assets/data'
// styles
import './style.css'

class RecentTransaction extends Component {
  render() {
    const { routeParams: { userAddress } } = this.props
    const recentTransaction = transaction.find(({ address }) => address === userAddress)

    let address, date, isChluTransaction, price, review, priceUSD

    if(recentTransaction) {
      ({ address, date, isChluTransaction, price, review } = recentTransaction)
      priceUSD = convertFromBtcToUsd(price)
    }

    return(
      !recentTransaction
        ? <div className='page-container container color-main'>
            Transactions to address <span className='font-weight-bold'>{userAddress}</span> was not
          </div>

        : <div className='page-container recent-transaction color-main'>
          <div className='section-head container'>
            <div className='title font-weight-bold'>Recent Transaction</div>
            <Link to='#' className='address'>{address}</Link>
            <div className='price'>
              <div className='price-title font-weight-bold'>Spent</div>
              <div className='price-spent'>
                <div className="price-spent__item font-weight-bold">{price} BTC</div>
                <div className="price-spent__item font-smaller">{priceUSD} USD</div>
              </div>
            </div>
          </div>
          <div className='section-content'>
            <div className='container'>

              <div className='transaction-info__wrapper'>
                <div className='transaction__info'>
                  <div className='field field-address'>
                    <div className='field__title'>To</div>
                    <div className='field__data'>{address}</div>
                  </div>
                  <div className='field field-date'>
                    <div className='field__title'>Date</div>
                    <div className='field__data'>{date}</div>
                  </div>
                  <div className='field field-amount'>
                    <div className='field__title '>Amount</div>
                    <div className='field__data'>{price} BTC</div>
                  </div>
                  {
                    isChluTransaction
                      ? null
                      : <div className='field-not-chlu'>Not Chlu transaction</div>
                  }
                </div>
              </div>

              <div className='review container-border-top'>
                <Review {...review} isMultipleReview />
              </div>
            </div>
          </div>
        </div>
    )
  }
}

export default RecentTransaction
