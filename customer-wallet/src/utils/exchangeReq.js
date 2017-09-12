function getExchangeRates () {
  return fetch(`https://openexchangerates.org/api/latest.json?app_id=${process.env.REACT_APP_OPEN_EXCHANGE_KEY}`)
    .then((response) => response.json())
    .then((response) => response)
    .catch((error) => console.log(error))
}

export {
  getExchangeRates
}
