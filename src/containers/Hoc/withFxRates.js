import React, { Component } from 'react'
// redux
import { connect } from 'react-redux'
import { getRates } from 'store/modules/data/fxRates'
// helpers
import { get, round } from 'lodash'
import { convertToBits } from 'helpers/converters'
// libs
import { fx } from 'money'

export default (WrappedComponent) => {
  class WithFxRates extends Component {
    constructor(props) {
      super()

      const { fxRates } = props

      this.fx = fx
      this.fx.rates = get(fxRates, 'rates')
      this.fx.base = get(fxRates, 'base', 'USD')
    }

    componentDidMount() {
      this.props.getRates()
    }

    getFx = () => this.fx

    convertSatoshiToBTC = (value = 0) => {
      const result = value / 100000000
      return result.toFixed(8)
    }

    convertBTCToSatoshi = (value = 0) => value * 100000000

    convertBitsToSatoshi = (value = 0) => value * 100

    convertSatoshiToBits = (value = 0) => value / 100

    convertFromBtcToUsd = (value = 0) => {
      const { fxRates } = this.props

      this.fx.rates = get(fxRates, 'rates')
      this.fx.base = get(fxRates, 'base', 'USD')

      return round(this.fx.convert(value, { from: 'BTC', to: 'USD' }), 2)
    }

    convertFromUsdToBtc = (value = 0) => {
      const { fxRates } = this.props

      this.fx.rates = get(fxRates, 'rates')
      this.fx.base = get(fxRates, 'base', 'USD')

      return this.fx.convert(value, { from: 'USD', to: 'BTC' })
    }

    convertFromUsdToBits = (value = 0) => {
      const btcValue = this.convertFromUsdToBtc(value)

      return convertToBits(btcValue, true, 8)
    }

    convertFromBtcToBits = (value = 0, round) => {
      return convertToBits(value, true, round)
    }

    convertFromBitsToUsd = (value = 0) => {
      const btcValue = convertToBits(value, false, 8)

      return this.convertFromBtcToUsd(btcValue)
    }

    render() {
      return <WrappedComponent
        convertSatoshiToBTC={this.convertSatoshiToBTC}
        convertBTCToSatoshi={this.convertBTCToSatoshi}
        convertFromBtcToUsd={this.convertFromBtcToUsd}
        convertFromUsdToBtc={this.convertFromUsdToBtc}
        convertFromUsdToBits={this.convertFromUsdToBits}
        convertFromBtcToBits={this.convertFromBtcToBits}
        convertSatoshiToBits={this.convertSatoshiToBits}
        convertFromBitsToUsd={this.convertFromBitsToUsd}
        convertBitsToSatoshi={this.convertBitsToSatoshi}
        getFx={this.getFx}
        {...this.props}
      />
    }
  }

  const mapStateToProps = store => ({
    fxRates: store.data.fxRates.rates,
  })

  const mapDispatchToProps = {
    getRates
  }

  return connect(mapStateToProps, mapDispatchToProps)(WithFxRates)
}
