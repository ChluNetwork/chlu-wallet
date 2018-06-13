import { createAction, handleActions } from 'redux-actions'
import { readReputation } from 'helpers/reputation/ipfs'
import { get } from 'lodash'
// ------------------------------------
// Constants
// ------------------------------------
const READ_REPUTATION_LOADING = 'READ_REPUTATION_LOADING'
const READ_REPUTATION_SUCCESS = 'READ_REPUTATION_SUCCESS'
const READ_REPUTATION_ERROR = 'READ_REPUTATION_ERROR'

function getInitialState() {
  return {
    loading: false,
    error: null,
    reviews: null
  }
}

// ------------------------------------
// Actions
// ------------------------------------
const readReputationLoading = createAction(READ_REPUTATION_LOADING)
const readReputationSuccess = createAction(READ_REPUTATION_SUCCESS)
const readReputationError = createAction(READ_REPUTATION_ERROR)

// ------------------------------------
// Thunks
// ------------------------------------

export function readMyReputation () {
  return async (dispatch, getState) => {
    const state = getState()
    const didId = get(state, 'data.wallet.did.publicDidDocument.id', null)
    if (didId) {
      dispatch(readReputationLoading())
      try {
        const reputation = await readReputation(didId)
        dispatch(readReputationSuccess(reputation))
      } catch (error) {
        console.log(error)
        dispatch(readReputationError(error.message || error))
      }
    } else {
      dispatch(readReputationError('Not logged in'))
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [READ_REPUTATION_LOADING]: state => ({
    ...state,
    loading: true
  }),
  [READ_REPUTATION_SUCCESS]: (state, { payload: reputation }) => ({
    ...state,
    loading: false,
    reputation
  }),
  [READ_REPUTATION_ERROR]: (state, { payload: error }) => ({
    ...state,
    loading: false,
    error 
  }),
}, getInitialState())
