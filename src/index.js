import React from 'react';
import ReactDOM from 'react-dom';
// components
import App from './containers/App';
// others
//import registerServiceWorker from './registerServiceWorker';
import { getChluIPFS, types } from 'helpers/ipfs'

ReactDOM.render(<App/>, document.getElementById('root'));
//registerServiceWorker();

// prestart chluIpfs
getChluIPFS(types.customer)