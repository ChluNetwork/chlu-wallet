import { createAction, handleActions } from 'redux-actions'
import { getChluAPIClient } from 'helpers/chlu'
import { geocode } from 'helpers/geocode';
import profileProvider from 'helpers/profileProvider'
import { setWalletToCreatedWallet } from 'store/modules/data/wallet'
import { getAddress } from 'helpers/wallet'

// ------------------------------------
// Constants
// ------------------------------------
const TOGGLE_SEARCH_SHOW = 'TOGGLE_SEARCH_SHOW'
const SET_CURRENT_PROFILE = 'profile/SET';

const initialState = {
  isSearchFieldOpen: false
}

// ------------------------------------
// Actions
// ------------------------------------
export const toggleSearchShow = createAction(TOGGLE_SEARCH_SHOW)
export const setProfile = createAction(SET_CURRENT_PROFILE);

// ------------------------------------
// Thunks
// ------------------------------------
export function fetchProfile(did) {
  return async (dispatch) => {
    let profile = await profileProvider.getProfile(did);
    dispatch(setProfile(profile || {}));
  }
}

export function updateProfile(profile) {
  return async (dispatch, getState) => {
    const currentProfile = getState().ui.profile
    const newProfile = { ...currentProfile, ...profile }
    const chluApiClient = await getChluAPIClient()
    await chluApiClient.updateVendorProfile(newProfile);
    dispatch(setProfile(newProfile))
  }
}

export function signupToMarketplace(profile) {
  return async (dispatch, getState) => {
    const state = getState()
    const walletCreated = state.components.createWallet.walletCreated
    // TODO: show logging in is in progress in the UI
    // update user vendor profile on marketplace
    const isBusiness = profile.signupType === "business"
    let businesslocationgeo = undefined
    if (isBusiness && profile.businesslocation) {
      // Pre-cache geo coords for location.
      // TODO: perhaps this could be done on the marketplace server, to ensure coords line up with the location text.
      try {
        let coords = await geocode(profile.businesslocation);
        if (coords) {
          businesslocationgeo = {
            latitude: coords.latitude,
            longitude: coords.longitude,
            bounds: coords.bounds
          }
        }
      } catch (err) {
        // Let's not break up the signup flow with API errors.
        console.error(err);
      }
    }
    const preparedProfile = {
      ...profile,
      vendorAddress: getAddress(walletCreated),
      'type': isBusiness ? 'business' : 'individual',
    }
    if (businesslocationgeo) {
      preparedProfile.businesslocationgeo = businesslocationgeo
    }
    const chluApiClient = await getChluAPIClient()
    await chluApiClient.importDID(walletCreated.did)
    await chluApiClient.registerToMarketplace(process.env.REACT_APP_MARKETPLACE_URL)
    await chluApiClient.updateVendorProfile(process.env.REACT_APP_MARKETPLACE_URL, preparedProfile)
    dispatch(setWalletToCreatedWallet()) // logs in user
    // TODO: signal login finished
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [TOGGLE_SEARCH_SHOW]: (state) => ({
    ...state,
    isSearchFieldOpen: !state.isSearchFieldOpen
  }),
  [SET_CURRENT_PROFILE]: (state, action) => ({
    ...state,
    profile: {
      ...state.profile,
      ...action.payload
    }
  })
}, initialState)
