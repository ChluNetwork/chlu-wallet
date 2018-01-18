import React, { Component } from 'react'
import { func, bool, oneOfType, object } from 'prop-types'
// hoc
import withFxRates from '../../Hoc/withFxRates'
// helpers
import { formatCurrency } from 'helpers/currencyFormat'
// components
import CustomerWalletFormWrapper from './CustomerWalletForm'
// styles
import './styles.css'

class CustomerWalletPage extends Component {
  static propTypes = {
    showModal: func,
    rates: oneOfType([object, bool]),
    convertSatoshiToBTC: func,
    convertFromBtcToUsd: func,
    convertFromUsdToBits: func,
    convertBTCToSatoshi: func
  }

  render() {
    const { price = 400, convertFromUsdToBits, convertBitsToSatoshi } = this.props
    const priceBits = convertFromUsdToBits(price, false)

    const formattedBits = formatCurrency(priceBits)
    const formattedUsd = formatCurrency(price)

    return (
      <div className='page-container customer-wallet-form'>
        <div className='container section-head color-main'>
          <div className='section-head__name color-light'>Payment for Shinny New Toy</div>
          <div className='section-head__price-usd'>$ {formattedUsd}</div>
          <div className='section-head__price-btc'>{formattedBits} bits</div>
        </div>
        <div className='section-content'>
          <CustomerWalletFormWrapper
            convertBitsToSatoshi={convertBitsToSatoshi}
            priceBtc={priceBits}
          />
        </div>
      </div>
    )
  }
}

export default withFxRates(CustomerWalletPage)
