import { createAction, handleActions } from 'redux-actions'
import { browserHistory } from 'react-router'
// data
import profileData from 'shared-libraries/lib/fixtures/profile'

// ------------------------------------
// Constants
// ------------------------------------
const FETCH_PROFILE_DATA_SUCCESS = 'FETCH_PROFILE_DATA_SUCCESS'
const FETCH_PROFILE_DATA_ERROR = 'FETCH_PROFILE_DATA_ERROR'
const FETCH_PROFILE_DATA_LOADING = 'FETCH_PROFILE_DATA_LOADING'
const CHANGE_USER_TYPE = 'CHANGE_USER_TYPE'

const initialState = {
  loading: false,
  error: null,
  data: null
}

// ------------------------------------
// Actions
// ------------------------------------
export const fetchProfileDataSuccess = createAction(FETCH_PROFILE_DATA_SUCCESS)
export const fetchProfileDataError = createAction(FETCH_PROFILE_DATA_ERROR)
export const fetchProfileDataLoading = createAction(FETCH_PROFILE_DATA_LOADING)
export const changeUserTypeAction = createAction(CHANGE_USER_TYPE)

// ------------------------------------
// Thunks
// ------------------------------------
function testReq () {
  return new Promise(resolve => setTimeout(() =>
    resolve(profileData), 1000))
}

export function getProfile () {
  return async (dispatch) => {
    dispatch(fetchProfileDataLoading(true))
    try {
      const response = await testReq()
      dispatch(fetchProfileDataSuccess(response))
      return response
    } catch (error) {
      dispatch(fetchProfileDataError(error))
      throw error
    }
  }
}

export function changeUserType (nextUser, id) {
  return dispatch => {
    dispatch(changeUserTypeAction(nextUser))
    browserHistory.replace(`/${nextUser}/${id}`)
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [FETCH_PROFILE_DATA_SUCCESS]: (state, { payload: data }) => ({
    ...state,
    data,
    loading: false,
    error: null
  }),
  [FETCH_PROFILE_DATA_ERROR]: (state, { payload: { error } }) => ({
    ...state,
    data: null,
    loading: false,
    error
  }),
  [FETCH_PROFILE_DATA_LOADING]: (state, { payload: loading }) => ({
    ...state,
    loading
  }),
  [CHANGE_USER_TYPE]: (state, { payload: userType } ) => ({
    ...state,
    data: {
      ...state.data,
      userType: userType
    }
  })
}, initialState)
