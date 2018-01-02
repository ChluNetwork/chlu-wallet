import React, { Component } from 'react'
// redux
import { connect } from 'react-redux'
import { getRates } from 'store/modules/data/fxRates'
// helpers
import { get } from 'lodash'
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

    convertFromBtcToUsd = (value = 0) => {
      const { fxRates } = this.props

      this.fx.rates = get(fxRates, 'rates')
      this.fx.base = get(fxRates, 'base', 'USD')

      return this.fx.convert(value, { from: 'BTC', to: 'USD' }).toFixed(4)
    }

    convertFromUsdToBtc = (value = 0) => {
      const { fxRates } = this.props

      this.fx.rates = get(fxRates, 'rates')
      this.fx.base = get(fxRates, 'base', 'USD')

      return this.fx.convert(value, { from: 'USD', to: 'BTC' }).toFixed(4)
    }

    render() {
      return <WrappedComponent
        convertSatoshiToBTC={this.convertSatoshiToBTC}
        convertBTCToSatoshi={this.convertBTCToSatoshi}
        convertFromBtcToUsd={this.convertFromBtcToUsd}
        convertFromUsdToBtc={this.convertFromUsdToBtc}
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
