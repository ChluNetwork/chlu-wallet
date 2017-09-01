import update from 'immutability-helper';

export const TOGGLE_COMING_SOON = 'chlu/comingSoon/TOGGLE_COMING_SOON'


const initialState = {
  open: false
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
  case TOGGLE_COMING_SOON:
    return update(state, {open: {$set: !state.open}})
  default:
    return state;
  }
}

