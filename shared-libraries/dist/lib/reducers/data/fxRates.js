'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchRatesLoading = exports.fetchRatesError = exports.fetchRatesSuccess = undefined;

var _handleActions;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.getRates = getRates;

var _reduxActions = require('redux-actions');

var _exchangeReq = require('shared-libraries/lib/utils/exchangeReq');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
// utils


// ------------------------------------
// Constants
// ------------------------------------
var FETCH_RATES_SUCCESS = 'rates/FETCH_RATES_SUCCESS';
var FETCH_RATES_ERROR = 'rates/FETCH_RATES_ERROR';
var FETCH_RATES_LOADING = 'rates/FETCH_RATES_LOADING';

var initialState = {
  loading: false,
  error: null,
  rates: null

  // ------------------------------------
  // Actions
  // ------------------------------------
};var fetchRatesSuccess = exports.fetchRatesSuccess = (0, _reduxActions.createAction)(FETCH_RATES_SUCCESS);
var fetchRatesError = exports.fetchRatesError = (0, _reduxActions.createAction)(FETCH_RATES_ERROR);
var fetchRatesLoading = exports.fetchRatesLoading = (0, _reduxActions.createAction)(FETCH_RATES_LOADING);
// ------------------------------------
// Thunks
// ------------------------------------
var getFxRates = function getFxRates() {
  return (0, _exchangeReq.getExchangeRates)().then(function (data) {
    return data;
  }).catch(function (error) {
    throw error;
  });
};

function getRates() {
  var _this = this;

  return function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(dispatch) {
      var response;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              dispatch(fetchRatesLoading(true));
              _context.prev = 1;
              _context.next = 4;
              return getFxRates();

            case 4:
              response = _context.sent;

              dispatch(fetchRatesSuccess(response));
              return _context.abrupt('return', response);

            case 9:
              _context.prev = 9;
              _context.t0 = _context['catch'](1);

              dispatch(fetchRatesError(_context.t0));
              throw _context.t0;

            case 13:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this, [[1, 9]]);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }();
}

// ------------------------------------
// Reducer
// ------------------------------------
exports.default = (0, _reduxActions.handleActions)((_handleActions = {}, _defineProperty(_handleActions, FETCH_RATES_SUCCESS, function (state, _ref2) {
  var rates = _ref2.payload;
  return _extends({}, state, {
    loading: false,
    error: null,
    rates: rates
  });
}), _defineProperty(_handleActions, FETCH_RATES_ERROR, function (state, _ref3) {
  var error = _ref3.payload;
  return _extends({}, state, {
    loading: false,
    error: error
  });
}), _defineProperty(_handleActions, FETCH_RATES_LOADING, function (state, _ref4) {
  var loading = _ref4.payload;
  return _extends({}, state, {
    loading: loading
  });
}), _handleActions), initialState);