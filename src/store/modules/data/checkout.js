import { createAction, handleActions } from 'redux-actions'
import { requestPopr } from 'helpers/marketplace'
import { getChluIPFS } from 'helpers/ipfs'

// ------------------------------------
// Constants
// ------------------------------------
const FETCH_CHECKOUT_DATA_SUCCESS = 'checkout/FETCH_CHECKOUT_DATA_SUCCESS'
const FETCH_CHECKOUT_DATA_ERROR = 'checkout/FETCH_CHECKOUT_DATA_ERROR'
const FETCH_CHECKOUT_DATA_LOADING = 'checkout/FETCH_CHECKOUT_DATA_LOADING'

const initialState = {
  loading: false,
  error: null,
  data: {}
}

// ------------------------------------
// Actions
// ------------------------------------
export const fetchCheckoutDataSuccess = createAction(FETCH_CHECKOUT_DATA_SUCCESS)
export const fetchCheckoutDataError = createAction(FETCH_CHECKOUT_DATA_ERROR)
export const fetchCheckoutDataLoading = createAction(FETCH_CHECKOUT_DATA_LOADING)

// ------------------------------------
// Thunks
// ------------------------------------

export function getCheckout (poprMultihash) {
  console.log(poprMultihash)
  return async dispatch => {
    dispatch(fetchCheckoutDataLoading(true))
    let popr = null
    try {
      if (poprMultihash) {
        console.log('Reading PoPR at ' + poprMultihash)
        const chluIpfs = await getChluIPFS()
        // TODO: create API calls in Chlu to fetch PoPR instead of this manual thing
        const buffer = await chluIpfs.instance.ipfsUtils.get(poprMultihash)
        popr = await chluIpfs.instance.protobuf.PoPR.decode(buffer)
        popr.multihash = poprMultihash
        // TODO: validation
        console.log('Read PoPR at ' + poprMultihash)
      } else {
        const vendorId = process.env.REACT_APP_VENDOR_ID || 'Qmtest'
        const url = process.env.REACT_APP_MARKETPLACE_URL || 'http://localhost:4000'
        console.log(`Requesting PoPR to ${url} for vendor ${vendorId}`)
        popr = await requestPopr(url, vendorId, {
          // TODO: fix the placeholder price
          amount: 25 * 10000,
          currency_symbol: 'tBTC'
        })
        popr.multihash = null
        console.log(`Requested PoPR to ${url} for vendor ${vendorId}`)
      }
      // TODO: get vendor_address properly instead of using the hardcoded address
      if (!popr.vendor_address) {
        popr.vendor_address = process.env.REACT_APP_VENDOR_ADDRESS || 'ms4TpM57RWHnEq5PRFtfJ8bcdiXoUE3tfv'
      }
      console.log(popr)
      dispatch(fetchCheckoutDataSuccess(Object.assign({}, popr)))
      return popr
    } catch (error) {
      dispatch(fetchCheckoutDataError(error.message || error))
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [FETCH_CHECKOUT_DATA_SUCCESS]: (state, { payload: data }) => ({
    ...state,
    data,
    loading: false,
    error: null
  }),
  [FETCH_CHECKOUT_DATA_ERROR]: (state, { payload: error }) => ({
    ...state,
    loading: false,
    error
  }),
  [FETCH_CHECKOUT_DATA_LOADING]: (state, { payload: loading }) => ({
    ...state,
    loading
  })
}, initialState)
