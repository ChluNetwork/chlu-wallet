import { fx } from 'money'
import rates from 'shared-libraries/lib/fixtures/rates'

fx.rates = rates.rates
fx.base = rates.base

const setFxRates = ({ rates, base }) => {
  fx.rates = rates
  fx.base = base
}

const convertFromBtcToUsd = (value) => fx.convert(value, { from: 'BTC', to: 'USD' }).toFixed(4)
const convertFromUsdToBtc = (value) => fx.convert(value, { from: 'USD', to: 'BTC' }).toFixed(4)

export { fx, setFxRates, convertFromBtcToUsd, convertFromUsdToBtc }
