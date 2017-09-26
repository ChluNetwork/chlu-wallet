'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _checkout = require('./data/checkout');

var checkout = _interopRequireWildcard(_checkout);

var _fxRates = require('./data/fxRates');

var fxRates = _interopRequireWildcard(_fxRates);

var _payment = require('./data/payment');

var payment = _interopRequireWildcard(_payment);

var _profile = require('./data/profile');

var profile = _interopRequireWildcard(_profile);

var _vendorWallet = require('./data/vendorWallet');

var vendorWallet = _interopRequireWildcard(_vendorWallet);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var dataActions = {
  checkout: checkout,
  fxRates: fxRates,
  payment: payment,
  profile: profile,
  vendorWallet: vendorWallet
};

exports.default = {
  dataActions: dataActions
};