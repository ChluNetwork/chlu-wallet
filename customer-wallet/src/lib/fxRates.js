import { fx } from 'money'
import rates from 'fixtures/rates'
// constants
const denominator = 100000000

fx.rates = rates.rates
fx.base = rates.base

const setFxRates = ({ rates, base }) => {
  fx.rates = rates
  fx.base = base
}

const convertSatoshiToBTC = (satoshiAmount) => {
  const rezult = satoshiAmount / denominator

  return rezult.toFixed(8)
}

const convertFromBtcToUsd = (value) => fx.convert(value, { from: 'BTC', to: 'USD' }).toFixed(4)
const convertFromUsdToBtc = (value) => fx.convert(value, { from: 'USD', to: 'BTC' }).toFixed(4)

export { fx, setFxRates, convertFromBtcToUsd, convertFromUsdToBtc, convertSatoshiToBTC }
