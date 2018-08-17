import React from 'react';
import ReactDOM from 'react-dom';

// components
import App from './containers/App';

// others
//import registerServiceWorker from './registerServiceWorker';
import { getChluAPIClient } from 'helpers/chlu';

ReactDOM.render(<App />, document.getElementById('root'));
//registerServiceWorker();

console.log('Chlu API Client Starting...')
getChluAPIClient().then(() => console.log('Chlu API Client READY'))
