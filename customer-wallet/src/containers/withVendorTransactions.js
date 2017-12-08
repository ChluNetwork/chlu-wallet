import React, { Component } from 'react'
import { object, func } from 'prop-types'
// redux
import { connect } from 'react-redux'
import { getVendorTransactions } from 'store/modules/data/vendorTransactions'
// helpers
import { get } from 'lodash'
// components
import CircularProgress from 'material-ui/CircularProgress'
// assets
import { address } from '../containers/Vendor/assets/data'

const withVendorTransactions = (WrappedComponent) => {
  class AsyncTransactionHistory extends Component {
    static propTypes = {
      vendorTransaction: object,
      getVendorTransactions: func
    }

    unconfirmed = new WebSocket('wss://socket.blockcypher.com/v1/btc/main')
    confirmed = new WebSocket('wss://socket.blockcypher.com/v1/btc/main')

    componentDidMount() {
      this.props.getVendorTransactions(address.address)

      // confirmed
      this.confirmed.onmessage = (event) => {
        const data = JSON.parse(get(event, 'data', '{}'))
        console.log('updated', data)
      }
      this.confirmed.onopen = () => {
        this.confirmed.send(JSON.stringify({
          event: 'confirmed-tx',
          address: address.address
        }))
      }

      // unconfirmed
      this.unconfirmed.onmessage = this.confirmed.onmessage
      this.unconfirmed.onopen = () => {
        this.unconfirmed.send(JSON.stringify({
          event: 'unconfirmed-tx',
          address: address.address
        }))
      }
    }

    componentWillUnmount () {
      this.unconfirmed.close()
      this.confirmed.close()
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
    getVendorTransactions
  }

  return connect(mapStateToProps, mapDispatchToProps)(AsyncTransactionHistory)
}

export default withVendorTransactions
