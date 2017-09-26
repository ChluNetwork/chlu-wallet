import { combineReducers } from 'redux'
import locationReducer from './modules/location'
import { reducer as formReducer } from 'redux-form'
import { reducer as toastrReducer } from 'react-redux-toastr'
import sharedReducers from 'shared-libraries/lib/reducers'
import ui from './modules/ui'
import components from './modules/components'

export const makeRootReducer = () => {
  return combineReducers({
    location: locationReducer,
    form: formReducer,
    toastr: toastrReducer,
    ...sharedReducers,
    ui,
    components
  })
}

export default makeRootReducer
