import { createAction, handleActions } from 'redux-actions'
import { browserHistory } from 'react-router'
// data
import profileData from 'fixtures/profile'

// ------------------------------------
// Constants
// ------------------------------------
const FETCH_PROFILE_DATA_SUCCESS = 'profile/FETCH_PROFILE_DATA_SUCCESS'
const FETCH_PROFILE_DATA_ERROR = 'profile/FETCH_PROFILE_DATA_ERROR'
const FETCH_PROFILE_DATA_LOADING = 'profile/FETCH_PROFILE_DATA_LOADING'
const CHANGE_USER_TYPE = 'profile/CHANGE_USER_TYPE'

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
    resolve(profileData), 500))
}

export function getProfile (nextUserType) {
  return async (dispatch) => {
    dispatch(fetchProfileDataLoading())
    try {
      const response = await testReq()
      dispatch(fetchProfileDataSuccess({
        ...response,
        userType: response.userType === nextUserType ? response.userType : nextUserType
      }))
      return response
    } catch (error) {
      dispatch(fetchProfileDataError(error))
      throw error
    }
  }
}

export function changeUserType (nextUser) {
  return dispatch => {
    dispatch(changeUserTypeAction(nextUser))
    browserHistory.replace(`/${nextUser}`)
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [FETCH_PROFILE_DATA_SUCCESS]: (state, { payload: data }) => ({
    data,
    loading: false,
    error: null
  }),
  [FETCH_PROFILE_DATA_ERROR]: (state, { payload: error }) => ({
    ...state,
    loading: false,
    error
  }),
  [FETCH_PROFILE_DATA_LOADING]: (state) => ({
    ...state,
    loading: true
  }),
  [CHANGE_USER_TYPE]: (state, { payload: userType } ) => ({
    ...state,
    data: {
      ...state.data,
      userType: userType
    }
  })
}, initialState)
