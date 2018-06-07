import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { reducer as toastrReducer } from 'react-redux-toastr'
import { routerReducer } from 'react-router-redux'
import ui from './modules/ui'
import components from './modules/components'
import data from './modules/data'

export const makeRootReducer = () => {
  return combineReducers({
    router: routerReducer,
    form: formReducer,
    toastr: toastrReducer,
    data,
    ui,
    components
  })
}

export default makeRootReducer
