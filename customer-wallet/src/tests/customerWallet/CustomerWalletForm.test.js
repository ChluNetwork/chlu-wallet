import React from 'react'
import { shallow } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import toJson from 'enzyme-to-json'
import CustomerWalletForm from '../../containers/Customer/CustomerWallet/CustomerWalletForm/CustomerWalletForm'

const mockStore = configureStore([])
const store = mockStore({ form: {} })

describe('<CustomerWalletForm />', () => {

  it('should render correctly customer wallet form', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <CustomerWalletForm
          onSubmit={() => null}
          isReviewOpen={false}
        />
      </Provider>
    )

    expect(toJson(wrapper.dive())).toMatchSnapshot()
  })
})
