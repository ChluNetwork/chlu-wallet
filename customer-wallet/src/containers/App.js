import React, { Component } from 'react'
// libs
import { browserHistory, Router } from 'react-router'
import { Provider } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getRoutes from 'routes'
import createStore from 'store/createStore'
// styles
import 'styles/main.css'

const store = createStore()

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider>
          <Router history={browserHistory} children={getRoutes(store)} />
        </MuiThemeProvider>
      </Provider>
    )
  }
}

export default App
