import React from 'react'
import { shallow } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import toJson from 'enzyme-to-json'
import Drawer from 'components/Drawer'

const mockStore = configureStore([])
const store = mockStore({ open: false })

describe('<Drawer />', () => {

  it('should render correctly drawer component', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <Drawer
          toggleDrawer={() => null}
          drawerOpen
        />
      </Provider>
    )

    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
