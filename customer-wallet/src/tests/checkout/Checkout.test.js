import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Checkout from 'containers/Checkout'

describe('<Checkout />', () => {

  it('should render correctly checkout container', () => {
    const wrapper = shallow(
      <Checkout />
    )

    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
