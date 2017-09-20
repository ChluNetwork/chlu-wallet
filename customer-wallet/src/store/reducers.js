import { combineReducers } from 'redux'
import locationReducer from './modules/location'
import { reducer as formReducer } from 'redux-form'
import { reducer as toastrReducer } from 'react-redux-toastr'
import ui from './modules/ui'
import data from './modules/data'
import components from './modules/components'

export const makeRootReducer = () => {
  return combineReducers({
    location: locationReducer,
    form: formReducer,
    toastr: toastrReducer,
    ui,
    data,
    components
  })
}

export default makeRootReducer
