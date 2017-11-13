import React from 'react'
import { Provider } from 'react-redux'
import Router from './Navigation/Router'
import createStore from './Config/CreateStore'
// constants
const store = createStore()

const App = () => (
  <Provider store={store}>
    <Router />
  </Provider>
)

export default App
