import React from 'react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Checkout from 'containers/Customer/Checkout'

const mockStore = configureStore([])
const store = mockStore({
  data: {
    checkout: {
      loading: false,
      error: null,
      data: {}
    }
  }
})

describe('<Checkout />', () => {

  it('should render correctly checkout container', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <Checkout />
      </Provider>
    )

    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
