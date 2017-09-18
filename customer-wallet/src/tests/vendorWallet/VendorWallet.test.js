import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import VendorWallet from 'containers/VendorWallet'

describe('<VendorWallet />', () => {

  it('should render correctly vendor wallet container', () => {
    const wrapper = shallow(
      <VendorWallet />
    )

    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
