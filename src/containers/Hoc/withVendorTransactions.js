import React, { Component } from 'react'
import { object, func } from 'prop-types'
// redux
import { connect } from 'react-redux'
import { getVendorTransactions, updateVendorTransactions } from 'store/modules/data/vendorTransactions'
// helpers
import { get } from 'lodash'
// assets
import { address } from '../Vendor/assets/data'
//
const apiEnd = process.env.REACT_APP_BLOCKCYPHER_RESOURCE || 'test3'

const withVendorTransactions = (WrappedComponent) => {
  class AsyncTransactionHistory extends Component {
    static propTypes = {
      vendorTransaction: object,
      getVendorTransactions: func,
      updateVendorTransactions: func
    }

    socket = new WebSocket(`wss://socket.blockcypher.com/v1/btc/${apiEnd}`)

    componentDidMount() {
      this.props.getVendorTransactions(address.address)

      this.socket.onmessage = (event) => {
        const data = JSON.parse(get(event, 'data', '{}'))
        this.props.updateVendorTransactions(data)
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

    render () {
      const { vendorTransactions } = this.props
      const loading = get(vendorTransactions, 'loading', false)
      const error = get(vendorTransactions, 'error', null)
      const transactions = get(vendorTransactions, 'data.txs', [])

      return <WrappedComponent
        groupTransactionByAddress={this.groupTransactionByAddress}
        vendorTransaction={vendorTransactions|| []}
        transactions={transactions}
        loading={loading}
        error={error}
        {...this.props}
      />
    }
  }

  const mapStateToProps = store => ({
    vendorTransactions: store.data.vendorTransaction
  })

  const mapDispatchToProps = {
    getVendorTransactions,
    updateVendorTransactions
  }

  return connect(mapStateToProps, mapDispatchToProps)(AsyncTransactionHistory)
}

export default withVendorTransactions
