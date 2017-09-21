import { fx } from 'money'
import rates from 'fixtures/rates'

fx.rates = rates.rates
fx.base = rates.base

const setFxRates = ({ rates, base }) => {
  fx.rates = rates
  fx.base = base
}

export { fx, setFxRates }
