import React, { Component } from 'react'
import { object, func } from 'prop-types'
// redux
import { connect } from 'react-redux'
import { getTransactions, updateTransactions } from 'store/modules/data/transactions'
// libs
import { get, groupBy } from 'lodash'
// helpers
import { calculateTotalSpentFromTransactions } from 'helpers/transactions'
import { getAddress } from 'helpers/wallet';

const apiEnd = process.env.REACT_APP_BLOCKCYPHER_RESOURCE || 'test3'

const withTransactions = (WrappedComponent) => {
  class AsyncTransactionHistory extends Component {
      static propTypes = {
          wallet: object,
          transactions: object,
          getTransactions: func,
          updateTransactions: func
      }

    socket = new WebSocket(`wss://socket.blockcypher.com/v1/btc/${apiEnd}`)

      componentDidMount() {
          const address = getAddress(this.props.wallet)
          this.props.getTransactions(address)

          this.socket.onmessage = (event) => {
              const data = JSON.parse(get(event, 'data', '{}'))
              this.props.updateTransactions(data)
          }

          this.socket.onopen = () => {
              this.socket.send(JSON.stringify({
                  event: 'tx-confirmation',
                  address: address
              }))
          }
      }

    componentWillUnmount () {
      this.socket.close()
    }

    groupTransactionByAddress = (transactions) => {
      const result = []
      const grouped = groupBy(transactions, ({ addresses }) => addresses[addresses.length - 1])

        for(const address in grouped){
        result.push({
            address,
            totalSpent: calculateTotalSpentFromTransactions(grouped[address], address),
            transactions: grouped[address]
        })
      }

      return result
    }

    render () {
      const { bitcoinTransactions } = this.props
      const loading = get(bitcoinTransactions, 'loading', false)
      const error = get(bitcoinTransactions, 'error', null)
      const transactionsParsed = get(bitcoinTransactions, 'data.txs', [])
      console.log(transactionsParsed)

      return <WrappedComponent
        groupTransactionByAddress={this.groupTransactionByAddress}
        transactions={transactionsParsed}
        loading={loading}
        error={error}
        {...this.props}
      />
    }
  }

  const mapStateToProps = store => ({
      bitcoinTransactions: store.data.transactions,
      wallet: store.data.wallet
  })

  const mapDispatchToProps = {
    getTransactions,
    updateTransactions
  }

  return connect(mapStateToProps, mapDispatchToProps)(AsyncTransactionHistory)
}

export default withTransactions
