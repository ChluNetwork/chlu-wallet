import React, { Component } from 'react'
import { func, bool, oneOfType, object } from 'prop-types'
// hoc
import withFxRates from '../../Hoc/withFxRates'
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
    convertFromUsdToBtc: func,
    convertBTCToSatoshi: func
  }

  render() {
    const { price = 400, convertFromUsdToBtc, convertBTCToSatoshi } = this.props
    const priceBtc = convertFromUsdToBtc(price)

    return (
      <div className='page-container customer-wallet-form'>
        <div className='container section-head color-main'>
          <div className='section-head__name color-light'>Payment for Shinny New Toy</div>
          <div className='section-head__price-usd'>$ {price}</div>
          <div className='section-head__price-btc'>{priceBtc} BTC</div>
        </div>
        <div className='section-content'>
          <CustomerWalletFormWrapper
            convertBTCToSatoshi={convertBTCToSatoshi}
            priceBtc={priceBtc}
          />
        </div>
      </div>
    )
  }
}

export default withFxRates(CustomerWalletPage)
