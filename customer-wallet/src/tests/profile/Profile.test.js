import React from 'react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Profile from 'containers/Profile'

const mockStore = configureStore([])
const store = mockStore({
  data: {
    profile: {
      loading: false,
      error: null,
      data: {}
    }
  }
})

describe('<Profile />', () => {

  it('should render correctly profile container', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <Profile />
      </Provider>
    )

    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
