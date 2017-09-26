import React from 'react'
import { shallow } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import toJson from 'enzyme-to-json'
import VendorWallet from 'containers/Vendor/VendorWallet'

const mockStore = configureStore([])
const store = mockStore({
  vendorWallet: {
    loading: false,
    error: null,
    reviews: []
  }
})

describe('<VendorWallet />', () => {

  it('should render correctly vendor wallet container', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <VendorWallet />
      </Provider>
    )

    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
