'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setPaymentLoading = exports.setPaymentError = exports.setPaymentSuccess = undefined;

var _handleActions;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.submitPayment = submitPayment;

var _reduxActions = require('redux-actions');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// ------------------------------------
// Constants
// ------------------------------------
var SET_PAYMENT_SUCCESS = 'payment/SET_PAYMENT_SUCCESS';
var SET_PAYMENT_ERROR = 'payment/SET_PAYMENT_ERROR';
var SET_PAYMENT_LOADING = 'payment/SET_PAYMENT_LOADING';

var initialState = {
  loading: false,
  error: null

  // ------------------------------------
  // Actions
  // ------------------------------------
};var setPaymentSuccess = exports.setPaymentSuccess = (0, _reduxActions.createAction)(SET_PAYMENT_SUCCESS);
var setPaymentError = exports.setPaymentError = (0, _reduxActions.createAction)(SET_PAYMENT_ERROR);
var setPaymentLoading = exports.setPaymentLoading = (0, _reduxActions.createAction)(SET_PAYMENT_LOADING);

// ------------------------------------
// Thunks
// ------------------------------------
function testReq(data) {
  return new Promise(function (resolve) {
    return setTimeout(function () {
      return resolve('payment success with following data ' + JSON.stringify(data));
    }, 1000);
  });
}

function submitPayment(data) {
  var _this = this;

  return function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(dispatch) {
      var response;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              dispatch(setPaymentLoading(true));
              _context.prev = 1;
              _context.next = 4;
              return testReq(data);

            case 4:
              response = _context.sent;

              dispatch(setPaymentSuccess());
              return _context.abrupt('return', response);

            case 9:
              _context.prev = 9;
              _context.t0 = _context['catch'](1);

              dispatch(setPaymentError({ error: _context.t0 }));
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
exports.default = (0, _reduxActions.handleActions)((_handleActions = {}, _defineProperty(_handleActions, SET_PAYMENT_SUCCESS, function (state) {
  return _extends({}, state, {
    loading: false,
    error: null
  });
}), _defineProperty(_handleActions, SET_PAYMENT_ERROR, function (state, _ref2) {
  var error = _ref2.payload.error;
  return _extends({}, state, {
    loading: false,
    error: error
  });
}), _defineProperty(_handleActions, SET_PAYMENT_LOADING, function (state, _ref3) {
  var loading = _ref3.payload;
  return _extends({}, state, {
    loading: loading
  });
}), _handleActions), initialState);