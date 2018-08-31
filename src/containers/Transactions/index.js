import React, { Component } from 'react'
// redux
import { connect } from 'react-redux'
import { compose } from 'redux'
// helpers
import { getAddress } from 'helpers/wallet';
// hoc
import withFxRates from 'containers/Hoc/withFxRates'
import withTransactions from 'containers/Hoc/withTransactions'
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

  constructor(props) {
    super(props)
    this.state = {
      Transactions: null
    }
  }

  componentDidMount() {
    this.refreshTransactions(this.props.vendor)
  }

  refreshTransactions(vendor = false) {
    this.setState({
      Transactions: withTransactions(TransactionLog)
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
            title='Your Bitcoin Address (Testnet)'
            subheader={address}
          />
        </Card>
        {Transactions ? <Transactions/> : <TransactionLog loading={true}/>}
      </div>
    )
  }
}

const mapStateToProps = store => ({
  wallet: store.data.wallet
})

export default compose(
  withFxRates,
  withStyles(styles),
  connect(mapStateToProps)
)(Transactions)
