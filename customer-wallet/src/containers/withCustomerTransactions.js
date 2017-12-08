import React, { Component } from 'react'
import { object, func } from 'prop-types'
// redux
import { connect } from 'react-redux'
import { getCustomerTransactions } from 'store/modules/data/customerTransactions'
// libs
import { get, groupBy } from 'lodash'
// components
import CircularProgress from 'material-ui/CircularProgress'
// assets
import { address } from '../containers/Customer/Transactions/assets/data'

const withCustomerTransactions = (WrappedComponent) => {
  class AsyncTransactionHistory extends Component {
    static propTypes = {
      customerTransactions: object,
      getCustomerTransactions: func
    }

    unconfirmed = new WebSocket('wss://socket.blockcypher.com/v1/btc/main')
    confirmed = new WebSocket('wss://socket.blockcypher.com/v1/btc/main')

    componentDidMount () {
      this.props.getCustomerTransactions(address.address)

      // confirmed
      this.confirmed.onmessage = (event) => {
        const data = JSON.parse(get(event, 'data', '{}'))
        console.log('updated', data)
      }
      this.confirmed.onopen = () => {
        this.confirmed.send(JSON.stringify({
          event: 'confirmed-tx',
          address
        }))
      }

      // unconfirmed
      this.unconfirmed.onmessage = this.confirmed.onmessage
      this.unconfirmed.onopen = () => {
        this.unconfirmed.send(JSON.stringify({
          event: 'unconfirmed-tx',
          address
        }))
      }
    }

    componentWillUnmount () {
      this.unconfirmed.close()
      this.confirmed.close()
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

      return (
        get(customerTransactions, 'loading') ? <CircularProgress /> : get(customerTransactions, 'error')
        ? 'Something went wrong!'
        : <WrappedComponent
            groupTransactionByAddress={this.groupTransactionByAddress}
            calculateTotalSpent={this.calculateTotalSpent}
            customerTransactions={customerTransactions}
            {...this.props}
          />
      )
    }
  }

  const mapStateToProps = store => ({
    customerTransactions: store.data.customerTransactions
  })

  const mapDispatchToProps = {
    getCustomerTransactions
  }

  return connect(mapStateToProps, mapDispatchToProps)(AsyncTransactionHistory)
}

export default withCustomerTransactions
