import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Profile from 'containers/Profile'

describe('<Profile />', () => {

  it('should render correctly profile container', () => {
    const wrapper = shallow(
      <Profile />
    )

    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
