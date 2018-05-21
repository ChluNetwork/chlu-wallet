import React, { Component } from 'react'
// libs
import { hashHistory, Router } from 'react-router'
import { Provider } from 'react-redux'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import getRoutes from 'routes'
import createStore from 'store/createStore'
// styles
import 'styles/main.css'

const store = createStore()
// Need to keep a ref to window so that chluIpfs can dispatch events
window.reduxStore = store;

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider>
          <Router history={hashHistory} children={getRoutes(store)} />
        </MuiThemeProvider>
      </Provider>
    )
  }
}

export { store }
export default App
