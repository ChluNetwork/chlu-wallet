import React, { Component } from 'react'
import PropTypes from 'prop-types'
// redux
import { connect } from 'react-redux'
import { actions } from 'shared-libraries/lib'
// libs
import _ from 'lodash'
// components
import CircularProgress from 'material-ui/CircularProgress'
// assets
import data from './assets/data'
// constants
const {
  dataActions: {
    transactionHistory: { getTransactionHistory }
  }
} = actions

const { address } = data

const withTransactionHistory = (WrappedComponent) => {
  class AsyncTransactionHistory extends Component {
    static propTypes = {
      transactionHistory: PropTypes.object,
      getTransactionHistory: PropTypes.func.isRequired
    }

    componentDidMount () {
      this.props.getTransactionHistory(address)
    }

    groupTransactionByAddress = (transactions) => {
      const rezult = []
      const grouped = _.groupBy(transactions, ({ addresses }) => addresses[addresses.length - 1])

      for(const address in grouped){
        rezult.push({
          address,
          totalSpent: this.calculateTotalSpent(grouped[address]),
          transactions: grouped[address]
        })
      }

      return rezult
    }

    calculateTotalSpent = (transactions, field = 'total') => {
      let rezult = 0

      if(Array.isArray(transactions) && transactions.length){
        rezult = transactions.reduce((accumulator, transaction) => (
          accumulator + transaction[field]
        ), 0)
      }

      return rezult
    }

    render () {
      const { transactionHistory: { loading } } = this.props

      return (
        loading
        ? <CircularProgress />
        : <WrappedComponent
          groupTransactionByAddress={this.groupTransactionByAddress}
          calculateTotalSpent={this.calculateTotalSpent}
          {...this.props}
        />
      )
    }
  }

  const mapStateToProps = store => ({
    transactionHistory: store.data.transactionHistory
  })

  const mapDispatchToProps = {
    getTransactionHistory
  }

  return connect(mapStateToProps, mapDispatchToProps)(AsyncTransactionHistory)
}

export default withTransactionHistory
