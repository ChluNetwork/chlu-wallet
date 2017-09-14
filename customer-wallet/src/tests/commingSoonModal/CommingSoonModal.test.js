import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import ComingSoonModal from 'components/ComingSoon'

describe('<ComingSoonModal />', () => {

  it('should render correctly modal component', () => {
    const wrapper = shallow(
      <ComingSoonModal
        open={false}
        closeModal={() => null}
      />
    )

    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
