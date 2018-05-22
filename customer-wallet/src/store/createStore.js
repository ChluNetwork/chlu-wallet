import { applyMiddleware, compose, createStore as createReduxStore } from 'redux'
import thunk from 'redux-thunk'
import makeRootReducer from './reducers'
import ApiClient from 'helpers/ApiClient'
import { routerMiddleware } from 'react-router-redux'

const createStore = (initialState = {}, history) => {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  const client = new ApiClient()
  const middleware = [thunk.withExtraArgument(client), routerMiddleware(history) ]

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = []
  let composeEnhancers = compose

  if (process.env.NODE_ENV === 'development') {
    if (typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function') {
      composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    }
  }

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createReduxStore(
    makeRootReducer(),
    initialState,
    composeEnhancers(
      applyMiddleware(...middleware),
      ...enhancers
    )
  )

  return store
}

export default createStore
