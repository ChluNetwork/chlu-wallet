import React, { Component } from 'react'
import { object, func, array } from 'prop-types'
// redux
import { connect } from 'react-redux'
import { getCustomerTransactions, updateCustomerTransactions } from 'store/modules/data/customerTransactions'
// libs
import { get, groupBy } from 'lodash'
import CircularProgress from '@material-ui/core/CircularProgress';
// helpers
import { calculateTotalSpentFromTransactions } from 'helpers/transactions'

const apiEnd = process.env.REACT_APP_BLOCKCYPHER_RESOURCE || 'test3'

const withCustomerTransactions = (WrappedComponent) => {
  class AsyncTransactionHistory extends Component {
      static propTypes = {
          addresses: array,
          customerTransactions: object,
          getCustomerTransactions: func,
          updateCustomerTransactions: func
      }

    socket = new WebSocket(`wss://socket.blockcypher.com/v1/btc/${apiEnd}`)

      componentDidMount() {
          const address = this.props.addresses[0]
          this.props.getCustomerTransactions(address)

          this.socket.onmessage = (event) => {
              const data = JSON.parse(get(event, 'data', '{}'))
              this.props.updateCustomerTransactions(data)
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
      const { customerTransactions } = this.props
      const loading = get(customerTransactions, 'loading', false)
      const error = get(customerTransactions, 'error', null)

      return <WrappedComponent
        groupTransactionByAddress={this.groupTransactionByAddress}
        customerTransactions={customerTransactions || []}
        loading={loading}
        error={error}
        {...this.props}
      />
    }
  }

  const mapStateToProps = store => ({
      customerTransactions: store.data.customerTransactions,
      addresses: store.data.wallet.addresses
  })

  const mapDispatchToProps = {
    getCustomerTransactions,
    updateCustomerTransactions
  }

  return connect(mapStateToProps, mapDispatchToProps)(AsyncTransactionHistory)
}

export default withCustomerTransactions
