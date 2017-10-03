'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.changeUserTypeAction = exports.fetchProfileDataLoading = exports.fetchProfileDataError = exports.fetchProfileDataSuccess = undefined;

var _handleActions;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.getProfile = getProfile;
exports.changeUserType = changeUserType;

var _reduxActions = require('redux-actions');

var _reactRouter = require('react-router');

var _profile = require('shared-libraries/lib/fixtures/profile');

var _profile2 = _interopRequireDefault(_profile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
// data


// ------------------------------------
// Constants
// ------------------------------------
var FETCH_PROFILE_DATA_SUCCESS = 'FETCH_PROFILE_DATA_SUCCESS';
var FETCH_PROFILE_DATA_ERROR = 'FETCH_PROFILE_DATA_ERROR';
var FETCH_PROFILE_DATA_LOADING = 'FETCH_PROFILE_DATA_LOADING';
var CHANGE_USER_TYPE = 'CHANGE_USER_TYPE';

var initialState = {
  loading: false,
  error: null,
  data: null

  // ------------------------------------
  // Actions
  // ------------------------------------
};var fetchProfileDataSuccess = exports.fetchProfileDataSuccess = (0, _reduxActions.createAction)(FETCH_PROFILE_DATA_SUCCESS);
var fetchProfileDataError = exports.fetchProfileDataError = (0, _reduxActions.createAction)(FETCH_PROFILE_DATA_ERROR);
var fetchProfileDataLoading = exports.fetchProfileDataLoading = (0, _reduxActions.createAction)(FETCH_PROFILE_DATA_LOADING);
var changeUserTypeAction = exports.changeUserTypeAction = (0, _reduxActions.createAction)(CHANGE_USER_TYPE);

// ------------------------------------
// Thunks
// ------------------------------------
function testReq() {
  return new Promise(function (resolve) {
    return setTimeout(function () {
      return resolve(_profile2.default);
    }, 1000);
  });
}

function getProfile() {
  var _this = this;

  return function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(dispatch) {
      var response;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              dispatch(fetchProfileDataLoading(true));
              _context.prev = 1;
              _context.next = 4;
              return testReq();

            case 4:
              response = _context.sent;

              dispatch(fetchProfileDataSuccess(response));
              return _context.abrupt('return', response);

            case 9:
              _context.prev = 9;
              _context.t0 = _context['catch'](1);

              dispatch(fetchProfileDataError(_context.t0));
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

function changeUserType(nextUser, id) {
  return function (dispatch) {
    dispatch(changeUserTypeAction(nextUser));
    _reactRouter.browserHistory.replace('/' + nextUser + '/' + id);
  };
}

// ------------------------------------
// Reducer
// ------------------------------------
exports.default = (0, _reduxActions.handleActions)((_handleActions = {}, _defineProperty(_handleActions, FETCH_PROFILE_DATA_SUCCESS, function (state, _ref2) {
  var data = _ref2.payload;
  return _extends({}, state, {
    data: data,
    loading: false,
    error: null
  });
}), _defineProperty(_handleActions, FETCH_PROFILE_DATA_ERROR, function (state, _ref3) {
  var error = _ref3.payload.error;
  return _extends({}, state, {
    data: null,
    loading: false,
    error: error
  });
}), _defineProperty(_handleActions, FETCH_PROFILE_DATA_LOADING, function (state, _ref4) {
  var loading = _ref4.payload;
  return _extends({}, state, {
    loading: loading
  });
}), _defineProperty(_handleActions, CHANGE_USER_TYPE, function (state, _ref5) {
  var userType = _ref5.payload;
  return _extends({}, state, {
    data: _extends({}, state.data, {
      userType: userType
    })
  });
}), _handleActions), initialState);