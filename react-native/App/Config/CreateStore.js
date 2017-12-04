import { applyMiddleware } from 'redux'
import ApiClient from '../Helpers/ApiClient'
import thunk from 'redux-thunk'
import rootReducer from '../Modules'
import './ReactotronConfig'

export default () => {
  const client = new ApiClient()
  const middleware = [thunk.withExtraArgument(client)]

  return console.tron.createStore(rootReducer, {}, applyMiddleware(...middleware))
}
