import React from 'react';
import App from '../containers/App'
import { shallow } from 'enzyme'

it('renders without crashing', () => {

  shallow(<App />)
});
