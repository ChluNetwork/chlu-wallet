'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.editReviewSuccess = exports.editReviewError = exports.editReviewLoading = exports.fetchTransactionDataLoading = exports.fetchTransactionDataError = exports.fetchTransactionDataSuccess = undefined;

var _handleActions;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.getTransactions = getTransactions;
exports.submitEditReview = submitEditReview;

var _reduxActions = require('redux-actions');

var _transactionsData = require('shared-libraries/lib/fixtures/transactionsData');

var _transactionsData2 = _interopRequireDefault(_transactionsData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// data


// ------------------------------------
// Constants
// ------------------------------------
var FETCH_TRANSACTION_DATA_SUCCESS = 'customer/FETCH_TRANSACTION_DATA_SUCCESS';
var FETCH_TRANSACTION_DATA_ERROR = 'customer/FETCH_TRANSACTION_DATA_ERROR';
var FETCH_TRANSACTION_DATA_LOADING = 'customer/FETCH_TRANSACTION_DATA_LOADING';
var EDIT_REVIEW_LOADING = 'customer/EDIT_REVIEW_LOADING';
var EDIT_REVIEW_ERROR = 'customer/EDIT_REVIEW_ERROR';
var EDIT_REVIEW_SUCCESS = 'customer/EDIT_REVIEW_SUCCESS';

var initialState = {
  loading: false,
  error: null,
  transactions: []

  // ------------------------------------
  // Actions
  // ------------------------------------
};var fetchTransactionDataSuccess = exports.fetchTransactionDataSuccess = (0, _reduxActions.createAction)(FETCH_TRANSACTION_DATA_SUCCESS);
var fetchTransactionDataError = exports.fetchTransactionDataError = (0, _reduxActions.createAction)(FETCH_TRANSACTION_DATA_ERROR);
var fetchTransactionDataLoading = exports.fetchTransactionDataLoading = (0, _reduxActions.createAction)(FETCH_TRANSACTION_DATA_LOADING);
var editReviewLoading = exports.editReviewLoading = (0, _reduxActions.createAction)(EDIT_REVIEW_LOADING);
var editReviewError = exports.editReviewError = (0, _reduxActions.createAction)(EDIT_REVIEW_ERROR);
var editReviewSuccess = exports.editReviewSuccess = (0, _reduxActions.createAction)(EDIT_REVIEW_SUCCESS);

// ------------------------------------
// Thunks
// ------------------------------------
function testReq() {
  return new Promise(function (resolve) {
    return setTimeout(function () {
      return resolve(_transactionsData2.default);
    }, 1000);
  });
}

function getTransactions(data) {
  var _this = this;

  return function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(dispatch) {
      var response;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              dispatch(fetchTransactionDataLoading(true));
              _context.prev = 1;
              _context.next = 4;
              return testReq(data);

            case 4:
              response = _context.sent;

              dispatch(fetchTransactionDataSuccess(response));
              return _context.abrupt('return', response);

            case 9:
              _context.prev = 9;
              _context.t0 = _context['catch'](1);

              dispatch(fetchTransactionDataError(_context.t0));
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

function testSubmitReq(data) {
  return new Promise(function (resolve) {
    return setTimeout(function () {
      return resolve('editing success with following data ' + JSON.stringify(data));
    }, 1000);
  });
}

function submitEditReview(data) {
  var _this2 = this;

  return function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(dispatch) {
      var response;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              dispatch(editReviewLoading(true));
              _context2.prev = 1;
              _context2.next = 4;
              return testSubmitReq(data);

            case 4:
              response = _context2.sent;

              dispatch(editReviewSuccess(data));
              return _context2.abrupt('return', response);

            case 9:
              _context2.prev = 9;
              _context2.t0 = _context2['catch'](1);

              dispatch(editReviewError(_context2.t0));
              throw _context2.t0;

            case 13:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this2, [[1, 9]]);
    }));

    return function (_x2) {
      return _ref2.apply(this, arguments);
    };
  }();
}

// ------------------------------------
// Reducer
// ------------------------------------
exports.default = (0, _reduxActions.handleActions)((_handleActions = {}, _defineProperty(_handleActions, FETCH_TRANSACTION_DATA_SUCCESS, function (state, _ref3) {
  var transactions = _ref3.payload;
  return _extends({}, state, {
    transactions: transactions,
    loading: false,
    error: null
  });
}), _defineProperty(_handleActions, FETCH_TRANSACTION_DATA_ERROR, function (state, _ref4) {
  var error = _ref4.payload;
  return _extends({}, state, {
    loading: false,
    error: error
  });
}), _defineProperty(_handleActions, FETCH_TRANSACTION_DATA_LOADING, function (state, _ref5) {
  var loading = _ref5.payload;
  return _extends({}, state, {
    loading: loading
  });
}), _defineProperty(_handleActions, EDIT_REVIEW_LOADING, function (state, _ref6) {
  var loading = _ref6.payload;
  return _extends({}, state, {
    loading: loading
  });
}), _defineProperty(_handleActions, EDIT_REVIEW_ERROR, function (state, _ref7) {
  var error = _ref7.payload;
  return _extends({}, state, {
    loading: false,
    error: error
  });
}), _defineProperty(_handleActions, EDIT_REVIEW_SUCCESS, function (state, _ref8) {
  var _ref8$payload = _ref8.payload,
      userAddress = _ref8$payload.userAddress,
      comment = _ref8$payload.comment;
  return _extends({}, state, {
    loading: false,
    error: null,
    transactions: state.transactions.map(function (transaction) {
      if (transaction.address === userAddress) {
        return _extends({}, transaction, {
          review: _extends({}, transaction.review, {
            commentsList: [].concat(_toConsumableArray(transaction.review.commentsList), [_extends({}, comment, { date: 'Aug 16, 2017' })])
          })
        });
      }

      return transaction;
    })
  });
}), _handleActions), initialState);