import { createAction, handleActions } from 'redux-actions'
import profileProvider from 'helpers/profileProvider'

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

export function updateProfile(didId, profile) {
  return async (dispatch) => {
    await profileProvider.setProfile(didId, profile);
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
