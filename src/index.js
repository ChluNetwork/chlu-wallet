import React from 'react';
import ReactDOM from 'react-dom';
// components
import App from './containers/App';
// others
//import registerServiceWorker from './registerServiceWorker';
import { getChluIPFS } from 'helpers/ipfs'

ReactDOM.render(<App/>, document.getElementById('root'));
//registerServiceWorker();

// prestart chluIpfs
getChluIPFS()
