import { createAction, handleActions } from 'redux-actions'
import { getChluAPIClient } from 'helpers/chlu'
import { geocode } from 'helpers/geocode';
import profileProvider from 'helpers/profileProvider'
import { setWalletToCreatedWallet, setWallet } from 'store/modules/data/wallet'
import { getAddress, importDID } from 'helpers/wallet'
import { get } from 'lodash'

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
    // TODO: show loading
    let profile = await profileProvider.getProfile(did);
    dispatch(setProfile(profile || {}));
    return profile
  }
}

export function updateProfile(profile) {
  return async (dispatch, getState) => {
    const currentProfile = getState().ui.profile.profile
    const newProfile = { ...currentProfile, ...profile }
    const chluApiClient = await getChluAPIClient()
    await chluApiClient.updateVendorProfile(process.env.REACT_APP_MARKETPLACE_URL, newProfile);
    dispatch(setProfile(newProfile))
    return newProfile
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
    await chluApiClient.registerToMarketplace(process.env.REACT_APP_MARKETPLACE_URL, preparedProfile)
    await chluApiClient.updateVendorProfile(process.env.REACT_APP_MARKETPLACE_URL, preparedProfile)
    dispatch(setWalletToCreatedWallet()) // logs in user
    // TODO: signal login finished
  }
}

export function signIn(exportedWallet) {
  return async dispatch => {
    // TODO: loading
    dispatch(setWallet(exportedWallet))
    const chluApiClient = await getChluAPIClient()
    await importDID(exportedWallet.did)
    // register to marketplace does nothing if the registration was already completed
    // otherwise corrects whatever data is missing
    await chluApiClient.registerToMarketplace(process.env.REACT_APP_MARKETPLACE_URL)
    // check that the profile vendor address is correct
    const profile = await dispatch(fetchProfile(exportedWallet.did.publicDidDocument.id))
    const vendorAddress = getAddress(exportedWallet)
    if (get(profile, 'vendorAddress', null) !== vendorAddress) {
      // update it if it's wrong
      const preparedProfile = {
        ...profile,
        vendorAddress
      }
      await chluApiClient.updateVendorProfile(process.env.REACT_APP_MARKETPLACE_URL, preparedProfile)
    }
    // TODO: loading finish
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
