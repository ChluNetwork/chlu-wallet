import React, { Component } from 'react'
import { shape, bool, any, object, func, number } from 'prop-types'
import { Link } from 'react-router-dom'
// redux
import { connect } from 'react-redux'
import { compose } from 'redux'
// helpers
import get from 'lodash/get'
// hoc
import withCustomerTransactions from '../../../Hoc/withCustomerTransactions'
import withFxRates from '../../../Hoc/withFxRates'
// components
import TransactionInfo from './TransactionInfo'
// styles
import './style.css'

class RecentTransaction extends Component {
  static propTypes = {
    customerTransactions: shape({
      loading: bool,
      error: any,
      data: object
    }),
    reviews: shape({
      loading: bool,
      error: any,
      data: object
    }),
    editRating: number,
    isEditFormOpen: bool,
    IsShowEditForm: func,
    groupTransactionByAddress: func,
    convertSatoshiToBTC: func,
    convertFromBtcToUsd: func,
    convertFromBitsToUsd: func,
    convertSatoshiToBits: func,
    convertFromUsdToBtc: func
  }

  componentDidMount() {
    const { isEditFormOpen } = this.props
    isEditFormOpen && this.hideEditForm()
  }

  render() {
    const {
      routeParams,
      customerTransactions,
      reviews,
      convertSatoshiToBTC,
      convertFromBitsToUsd,
      convertFromBtcToUsd,
      convertSatoshiToBits
    } = this.props

    const address = get(routeParams,'address', '')

    const transaction = get(customerTransactions, 'data.txs', [])
      .filter(({ addresses }) => addresses[addresses.length - 1] === address)

    return (
      <div className='page-container color-main'>
        {transaction.length
          ? <div className='recent-transaction'>
            <div className='section-head container'>
              <div className='title font-weight-bold'>Recent Transaction</div>
              <Link to='#' className='address'>{address}</Link>
            </div>
            <div className='section-content'>
              <div className='container'>
                <div className='transaction-info__wrapper'>
                  {transaction.map((item, index) => (
                    <TransactionInfo
                      key={index}
                      address={address}
                      transaction={item}
                      convertSatoshiToBits={convertSatoshiToBits}
                      convertSatoshiToBTC={convertSatoshiToBTC}
                      convertFromBtcToUsd={convertFromBtcToUsd}
                      convertFromBitsToUsd={convertFromBitsToUsd}
                      review={reviews.reviews[item.hash]}
                      editing={reviews.editing}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          : <div className='container'>
            There are no transactions with this address <span className='font-weight-bold'>({address})</span>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = store => ({
  transactionHistory: store.data.transactionHistory,
  reviews: store.data.reviews
})

export default compose(
  withFxRates,
  withCustomerTransactions,
  connect(mapStateToProps)
)(RecentTransaction)
