'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchVendorDataLoading = exports.fetchVendorDataError = exports.fetchVendorDataSuccess = undefined;

var _handleActions;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.getVendorReviews = getVendorReviews;

var _reduxActions = require('redux-actions');

var _vendorData = require('shared-libraries/lib/fixtures/vendorData');

var _vendorData2 = _interopRequireDefault(_vendorData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// data


// ------------------------------------
// Constants
// ------------------------------------
var FETCH_VENDOR_DATA_SUCCESS = 'FETCH_VENDOR_DATA_SUCCESS';
var FETCH_VENDOR_DATA_ERROR = 'FETCH_VENDOR_DATA_ERROR';
var FETCH_VENDOR_DATA_LOADING = 'FETCH_VENDOR_DATA_LOADING';

var initialState = {
  loading: false,
  error: null,
  reviews: []

  // ------------------------------------
  // Actions
  // ------------------------------------
};var fetchVendorDataSuccess = exports.fetchVendorDataSuccess = (0, _reduxActions.createAction)(FETCH_VENDOR_DATA_SUCCESS);
var fetchVendorDataError = exports.fetchVendorDataError = (0, _reduxActions.createAction)(FETCH_VENDOR_DATA_ERROR);
var fetchVendorDataLoading = exports.fetchVendorDataLoading = (0, _reduxActions.createAction)(FETCH_VENDOR_DATA_LOADING);

// ------------------------------------
// Thunks
// ------------------------------------
function testReq() {
  return new Promise(function (resolve) {
    return setTimeout(function () {
      return resolve(_vendorData2.default);
    }, 1000);
  });
}

function getVendorReviews(data) {
  var _this = this;

  return function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(dispatch) {
      var response;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              dispatch(fetchVendorDataLoading(true));
              _context.prev = 1;
              _context.next = 4;
              return testReq(data);

            case 4:
              response = _context.sent;

              dispatch(fetchVendorDataSuccess(response));
              return _context.abrupt('return', response);

            case 9:
              _context.prev = 9;
              _context.t0 = _context['catch'](1);

              dispatch(fetchVendorDataError({ error: _context.t0 }));
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
exports.default = (0, _reduxActions.handleActions)((_handleActions = {}, _defineProperty(_handleActions, FETCH_VENDOR_DATA_SUCCESS, function (state, _ref2) {
  var reviews = _ref2.payload;
  return _extends({}, state, {
    reviews: reviews,
    loading: false,
    error: null
  });
}), _defineProperty(_handleActions, FETCH_VENDOR_DATA_ERROR, function (state, _ref3) {
  var error = _ref3.payload.error;
  return _extends({}, state, {
    loading: false,
    error: error
  });
}), _defineProperty(_handleActions, FETCH_VENDOR_DATA_LOADING, function (state, _ref4) {
  var loading = _ref4.payload;
  return _extends({}, state, {
    loading: loading
  });
}), _handleActions), initialState);