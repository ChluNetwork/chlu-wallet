'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require('redux');

var _vendorWallet = require('./vendorWallet');

var _vendorWallet2 = _interopRequireDefault(_vendorWallet);

var _payment = require('./payment');

var _payment2 = _interopRequireDefault(_payment);

var _fxRates = require('./fxRates');

var _fxRates2 = _interopRequireDefault(_fxRates);

var _profile = require('./profile');

var _profile2 = _interopRequireDefault(_profile);

var _checkout = require('./checkout');

var _checkout2 = _interopRequireDefault(_checkout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _redux.combineReducers)({
  vendorWallet: _vendorWallet2.default,
  payment: _payment2.default,
  fxRates: _fxRates2.default,
  profile: _profile2.default,
  checkout: _checkout2.default
});
// reducers