import { combineReducers } from 'redux'
// import sharedReducers from 'shared-libraries/lib/reducers'

export const makeRootReducer = () => {
  return combineReducers({
    // ...sharedReducers
  })
}

export default makeRootReducer
