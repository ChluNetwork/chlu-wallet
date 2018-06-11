import React from 'react'
// libs
import createHistory from 'history/createHashHistory'
import { ConnectedRouter } from 'react-router-redux'
import { Provider } from 'react-redux'
import createStore from 'store/createStore'
// containers
import MainLayout from './Layout/MainLayout'

const history = createHistory()
// keep track of history for helpers/replace.js to work
window.appHistory = history 
const store = createStore({}, history)
// Need to keep a ref to window so that chluIpfs can dispatch events
window.reduxStore = store;

export default function App() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <MainLayout/>
        </ConnectedRouter>
      </Provider>
    )
}
