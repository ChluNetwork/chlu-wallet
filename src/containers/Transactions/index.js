import React, { Component } from 'react'
import { shape, bool, any, object, func, number } from 'prop-types'
// redux
import { connect } from 'react-redux'
import { compose } from 'redux'
// helpers
import get from 'lodash/get'
import { getAddress } from 'helpers/wallet';
// hoc
import withFxRates from 'containers/Hoc/withFxRates'
import withCustomerTransactions from 'containers/Hoc/withCustomerTransactions'
import withVendorTransactions from 'containers/Hoc/withVendorTransactions'
// components
import { Card, CardHeader, Avatar, withStyles } from '@material-ui/core';
import TransactionLog from './TransactionLog'
// icons
import WalletIcon from '@material-ui/icons/AccountBalanceWallet'

const styles = {
  card: {
    margin: '30px'
  }
}

class Transactions extends Component {
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
    convertFromUsdToBtc: func,
    vendor: bool
  }

  constructor(props) {
    super(props)
    this.state = {
      Transactions: null
    }
  }

  componentWillReceiveProps(newProps) {
    if (Boolean(this.props.vendor) !== Boolean(newProps.vendor)) {
      this.refreshTransactions(newProps.vendor)
    }
  }

  componentDidMount() {
    this.refreshTransactions(this.props.vendor)
  }

  refreshTransactions(vendor = false) {
    this.setState({
      Transactions: vendor ? withVendorTransactions(TransactionLog) : withCustomerTransactions(TransactionLog)
    })
  }

  render() {
    const {
      wallet,
      classes
    } = this.props

    // TODO: transaction filtering based on route parameter
    const address = getAddress(wallet)
    const Transactions = this.state.Transactions

    return (
      <div>
        <Card className={classes.card}>
          <CardHeader
            avatar={<Avatar><WalletIcon/></Avatar>}
            title='Bitcoin Wallet (Testnet)'
            subheader={address}
          />
        </Card>
        {Transactions ? <Transactions/> : <TransactionLog loading={true}/>}
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
  withStyles(styles),
  connect(mapStateToProps)
)(Transactions)
