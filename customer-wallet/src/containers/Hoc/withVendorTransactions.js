import React, { Component } from 'react'
import { object, func } from 'prop-types'
// redux
import { connect } from 'react-redux'
import { getVendorTransactions, updateVendorTransactions } from 'store/modules/data/vendorTransactions'
// helpers
import { get } from 'lodash'
// components
import CircularProgress from 'material-ui/core/CircularProgress'
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
      const { vendorTransaction } = this.props

      return (
        vendorTransaction.loading ? <CircularProgress /> : vendorTransaction.error
        ? 'Something went wrong'
        : <WrappedComponent
            vendorTransaction={vendorTransaction}
            {...this.props}
          />
      )
    }
  }

  const mapStateToProps = store => ({
    vendorTransaction: store.data.vendorTransaction
  })

  const mapDispatchToProps = {
    getVendorTransactions,
    updateVendorTransactions
  }

  return connect(mapStateToProps, mapDispatchToProps)(AsyncTransactionHistory)
}

export default withVendorTransactions
