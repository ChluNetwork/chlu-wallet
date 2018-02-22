import React, { Component } from 'react'
import { object, func } from 'prop-types'
// redux
import { connect } from 'react-redux'
import { getCustomerTransactions, updateCustomerTransactions } from 'store/modules/data/customerTransactions'
// libs
import { get, groupBy } from 'lodash'
// components
import CircularProgress from 'material-ui/CircularProgress'
// assets
import { address } from '../Customer/Transactions/assets/data'
//
const apiEnd = process.env.REACT_APP_BLOCKCYPHER_RESOURCE || 'test3'

const withCustomerTransactions = (WrappedComponent) => {
  class AsyncTransactionHistory extends Component {
    static propTypes = {
      customerTransactions: object,
      getCustomerTransactions: func,
      updateCustomerTransactions: func
    }

    socket = new WebSocket(`wss://socket.blockcypher.com/v1/btc/${apiEnd}`)

    componentDidMount() {
      this.props.getCustomerTransactions(address.address)

      this.socket.onmessage = (event) => {
        const data = JSON.parse(get(event, 'data', '{}'))
        this.props.updateCustomerTransactions(data)
      }

      this.socket.onopen = () => {
        this.socket.send(JSON.stringify({
          event: 'tx-confirmation',
          address: address.address
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
          totalSpent: this.calculateTotalSpent(grouped[address]),
          transactions: grouped[address]
        })
      }

      return result
    }

    calculateTotalSpent = (transactions, field = 'total') => {
      let result = 0

      if(Array.isArray(transactions) && transactions.length){
        result = transactions.reduce((accumulator, transaction) => (
          accumulator + transaction[field]
        ), 0)
      }

      return result
    }

    render () {
      const { customerTransactions } = this.props
      const loading = get(customerTransactions, 'loading', false) 
      const error = get(customerTransactions, 'error', null)

      if (loading) {
        return <CircularProgress />
      } else if (error) {
        return <div>Something went wrong!</div>
      } else {
        return <WrappedComponent
          groupTransactionByAddress={this.groupTransactionByAddress}
          calculateTotalSpent={this.calculateTotalSpent}
          customerTransactions={customerTransactions}
          {...this.props}
        />
      }
    }
  }

  const mapStateToProps = store => ({
    customerTransactions: store.data.customerTransactions
  })

  const mapDispatchToProps = {
    getCustomerTransactions,
    updateCustomerTransactions
  }

  return connect(mapStateToProps, mapDispatchToProps)(AsyncTransactionHistory)
}

export default withCustomerTransactions
