import { combineReducers } from 'redux'
import locationReducer from './modules/location'
import { reducer as formReducer } from 'redux-form'
import { reducer as toastrReducer } from 'react-redux-toastr'
import ui from './modules/ui'
import payment from './modules/payment'

export const makeRootReducer = () => {
  return combineReducers({
    location: locationReducer,
    form: formReducer,
    toastr: toastrReducer,
    ui,
    payment
  })
}

export default makeRootReducer
