'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchTransactionHistoryLoading = exports.fetchTransactionHistoryError = exports.fetchTransactionHistorySuccess = undefined;

var _handleActions;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.getTransactionHistory = getTransactionHistory;

var _reduxActions = require('redux-actions');

var _fetch_transaction_history = require('chlu-wallet-support-js/src/fetch_transaction_history');

var _fetch_transaction_history2 = _interopRequireDefault(_fetch_transaction_history);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
// api


// ------------------------------------
// Constants
// ------------------------------------
var FETCH_TRANSACTION_HISTORY_SUCCESS = 'customer/FETCH_TRANSACTION_HISTORY_SUCCESS';
var FETCH_TRANSACTION_HISTORY_ERROR = 'customer/FETCH_TRANSACTION_HISTORY_ERROR';
var FETCH_TRANSACTION_HISTORY_LOADING = 'customer/FETCH_TRANSACTION_HISTORY_LOADING';

var initialState = {
  loading: false,
  error: null,
  data: {}

  // ------------------------------------
  // Actions
  // ------------------------------------
};var fetchTransactionHistorySuccess = exports.fetchTransactionHistorySuccess = (0, _reduxActions.createAction)(FETCH_TRANSACTION_HISTORY_SUCCESS);
var fetchTransactionHistoryError = exports.fetchTransactionHistoryError = (0, _reduxActions.createAction)(FETCH_TRANSACTION_HISTORY_ERROR);
var fetchTransactionHistoryLoading = exports.fetchTransactionHistoryLoading = (0, _reduxActions.createAction)(FETCH_TRANSACTION_HISTORY_LOADING);

// ------------------------------------
// Thunks
// ------------------------------------
function getTransactionHistory(address) {
  var _this = this;

  return function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(dispatch) {
      var fetch, response, responceWithTransactionPlatform;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              dispatch(fetchTransactionHistoryLoading(true));
              _context.prev = 1;
              fetch = new _fetch_transaction_history2.default();
              _context.next = 5;
              return fetch.getFromBlockchain(address);

            case 5:
              response = _context.sent;
              responceWithTransactionPlatform = _extends({}, response, {
                txs: response.txs.map(function (transaction) {
                  return _extends({}, transaction, {
                    isChluTransaction: Math.random() > 0.5
                  });
                })
              });

              dispatch(fetchTransactionHistorySuccess(responceWithTransactionPlatform));
              return _context.abrupt('return', response);

            case 11:
              _context.prev = 11;
              _context.t0 = _context['catch'](1);

              dispatch(fetchTransactionHistoryError(_context.t0));
              throw _context.t0;

            case 15:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this, [[1, 11]]);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }();
}

// ------------------------------------
// Reducer
// ------------------------------------
exports.default = (0, _reduxActions.handleActions)((_handleActions = {}, _defineProperty(_handleActions, FETCH_TRANSACTION_HISTORY_SUCCESS, function (state, _ref2) {
  var data = _ref2.payload;
  return _extends({}, state, {
    data: data,
    loading: false,
    error: null
  });
}), _defineProperty(_handleActions, FETCH_TRANSACTION_HISTORY_ERROR, function (state, _ref3) {
  var error = _ref3.payload;
  return _extends({}, state, {
    loading: false,
    error: error
  });
}), _defineProperty(_handleActions, FETCH_TRANSACTION_HISTORY_LOADING, function (state, _ref4) {
  var loading = _ref4.payload;
  return _extends({}, state, {
    loading: loading
  });
}), _handleActions), initialState);