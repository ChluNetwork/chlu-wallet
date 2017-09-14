function getExchangeRates () {
  const isTestEnv = process.env.NODE_ENV === 'test'

  if (isTestEnv) {
    return new Promise(resolve => resolve())
  }

  return fetch(`https://openexchangerates.org/api/latest.json?app_id=${process.env.REACT_APP_OPEN_EXCHANGE_KEY}`)
    .then((response) => response.json())
    .then((response) => response)
    .catch((error) => console.log(error))
}

export {
  getExchangeRates
}
