'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getExchangeRates = undefined;

var _rates = require('shared-libraries/lib/fixtures/rates');

var _rates2 = _interopRequireDefault(_rates);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getExchangeRates() {
  var isTestEnv = process.env.NODE_ENV === 'test';

  if (isTestEnv) {
    return new Promise(function (resolve) {
      return resolve(_rates2.default);
    });
  }

  return fetch('https://openexchangerates.org/api/latest.json?app_id=' + process.env.REACT_APP_OPEN_EXCHANGE_KEY).then(function (response) {
    return response.json();
  }).then(function (response) {
    return response;
  }).catch(function (error) {
    return console.log(error);
  });
}

exports.getExchangeRates = getExchangeRates;