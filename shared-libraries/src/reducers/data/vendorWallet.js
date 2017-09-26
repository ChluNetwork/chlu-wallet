import { createAction, handleActions } from 'redux-actions'

// data
import vendorData from '../../fixtures/vendorData'

// ------------------------------------
// Constants
// ------------------------------------
const FETCH_VENDOR_DATA_SUCCESS = 'FETCH_VENDOR_DATA_SUCCESS'
const FETCH_VENDOR_DATA_ERROR = 'FETCH_VENDOR_DATA_ERROR'
const FETCH_VENDOR_DATA_LOADING = 'FETCH_VENDOR_DATA_LOADING'

const initialState = {
  loading: false,
  error: null,
  reviews: []
}

// ------------------------------------
// Actions
// ------------------------------------
export const fetchVendorDataSuccess = createAction(FETCH_VENDOR_DATA_SUCCESS)
export const fetchVendorDataError = createAction(FETCH_VENDOR_DATA_ERROR)
export const fetchVendorDataLoading = createAction(FETCH_VENDOR_DATA_LOADING)

// ------------------------------------
// Thunks
// ------------------------------------
function testReq () {
  return new Promise(resolve => setTimeout(() =>
    resolve(vendorData), 1000))
}

export function getVendorReviews (data) {
  return async (dispatch) => {
    dispatch(fetchVendorDataLoading(true))
    try {
      const response = await testReq(data)
      dispatch(fetchVendorDataSuccess(response))
      return response
    } catch (error) {
      dispatch(fetchVendorDataError({ error }))
      throw error
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [FETCH_VENDOR_DATA_SUCCESS]: (state, { payload: reviews }) => ({
    ...state,
    reviews,
    loading: false,
    error: null
  }),
  [FETCH_VENDOR_DATA_ERROR]: (state, { payload: { error } }) => ({
    ...state,
    loading: false,
    error
  }),
  [FETCH_VENDOR_DATA_LOADING]: (state, { payload: loading }) => ({
    ...state,
    loading
  })
}, initialState)
