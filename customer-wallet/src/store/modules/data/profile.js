import { createAction, handleActions } from 'redux-actions'

// data
import profileData from 'fixtures/profile.js'

// ------------------------------------
// Constants
// ------------------------------------
const FETCH_PROFILE_DATA_SUCCESS = 'FETCH_PROFILE_DATA_SUCCESS'
const FETCH_PROFILE_DATA_ERROR = 'FETCH_PROFILE_DATA_ERROR'
const FETCH_PROFILE_DATA_LOADING = 'FETCH_PROFILE_DATA_LOADING'

const initialState = {
  loading: false,
  error: null,
  data: {}
}

// ------------------------------------
// Actions
// ------------------------------------
export const fetchProfileDataSuccess = createAction(FETCH_PROFILE_DATA_SUCCESS)
export const fetchProfileDataError = createAction(FETCH_PROFILE_DATA_ERROR)
export const fetchProfileDataLoading = createAction(FETCH_PROFILE_DATA_LOADING)

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
    loading: false,
    error
  }),
  [FETCH_PROFILE_DATA_LOADING]: (state, { payload: loading }) => ({
    ...state,
    loading
  })
}, initialState)
