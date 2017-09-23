import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Demo from 'containers/Demonstrator/Demo'

describe('<Demo />', () => {

  it('should render correctly demo container', () => {
    const wrapper = shallow(
      <Demo />
    )

    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
