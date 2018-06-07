import React, { Component } from 'react'
import { shape, bool, any, object, func, number } from 'prop-types'
// redux
import { connect } from 'react-redux'
import { compose } from 'redux'
// helpers
import get from 'lodash/get'
import { getAddress } from 'helpers/wallet';
// hoc
import withCustomerTransactions from '../Hoc/withCustomerTransactions'
import withFxRates from '../Hoc/withFxRates'
// components
import { Card, CardHeader, Avatar, withStyles } from '@material-ui/core';
import TransactionInfo from './TransactionInfo'
// icons
import WalletIcon from '@material-ui/icons/AccountBalanceWallet'
import ErrorIcon from '@material-ui/icons/ErrorOutline'
import LoadingIcon from '@material-ui/icons/Sync'

const styles = {
  card: {
    margin: '30px'
  }
}

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
      wallet,
      classes,
      customerTransactions,
      reviews,
      convertSatoshiToBTC,
      convertFromBitsToUsd,
      convertFromBtcToUsd,
      convertSatoshiToBits,
      loading,
      error
    } = this.props

    // TODO: transaction filtering based on route parameter
    const address = getAddress(wallet)
    const transactions = get(customerTransactions, 'data.txs', [])

    return (
      <div>
        <Card className={classes.card}>
          <CardHeader
            avatar={<Avatar><WalletIcon/></Avatar>}
            title='Bitcoin Wallet (Testnet)'
            subheader={address}
          />
        </Card>
        {transactions.length
          ? <div>
              {transactions.map((item, index) => (
                <TransactionInfo
                  key={index}
                  address={item.addresses[0]}
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
          : error
          ? <Card className={classes.card}>
              <CardHeader
                avatar={<Avatar><ErrorIcon/></Avatar>}
                title={error || 'Something went wrong'}
              />
            </Card>
          : loading
          ? <Card className={classes.card}>
              <CardHeader
                avatar={<Avatar><LoadingIcon/></Avatar>}
                title='Fetching transactions...'
              />
            </Card>
          : <Card className={classes.card}>
              <CardHeader
                avatar={<Avatar>?</Avatar>}
                title='No transactions to show'
              />
            </Card>
        }
      </div>
    )
  }
}

const mapStateToProps = store => ({
  wallet: store.data.wallet,
  transactionHistory: store.data.transactionHistory,
  reviews: store.data.reviews
})

export default compose(
  withFxRates,
  withCustomerTransactions,
  withStyles(styles),
  connect(mapStateToProps)
)(RecentTransaction)
