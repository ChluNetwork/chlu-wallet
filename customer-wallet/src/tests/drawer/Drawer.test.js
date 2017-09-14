import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Drawer from 'components/Drawer'

describe('<Drawer />', () => {

  it('should render correctly drawer component', () => {
    const wrapper = shallow(
      <Drawer
        toggleDrawer={() => null}
        drawerOpen
      />
    )

    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
