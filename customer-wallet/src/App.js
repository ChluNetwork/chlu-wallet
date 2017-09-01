import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import { CustomerWallet } from './components'

import reducers from './reducers'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
let store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

class App extends Component {
  render() {
      return (
          <Provider store={store}>
              <MuiThemeProvider>
                  <div>
                      <AppBar
                          title="Chlu"
                          iconClassNameRight="muidocs-icon-navigation-expand-more"
                      />
                      <CustomerWallet />
                  </div>
              </MuiThemeProvider>
          </Provider>
    );
  }
}

export default App;
