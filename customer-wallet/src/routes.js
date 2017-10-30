import React from 'react'
import { Route, IndexRedirect, browserHistory } from 'react-router'
import 'babel-polyfill'
// redux
import dataActions from 'shared-libraries/lib/reducers/actions'
// containers
import MainLayout from './containers/MainLayout'
import CustomerWallet from './containers/Customer/CustomerWallet'
import VendorWallet from './containers/Vendor/VendorWallet'
import Checkout from './containers/Customer/Checkout'
import Profile from './containers/Vendor/Profile'
import TransactionHistory from './containers/Customer/Transactions/TransactionHistory'
import RecentTransactions from './containers/Customer/Transactions/RecentTransactions'
import NotFound from './components/NotFound/'
import Demo from './containers/Demonstrator/Demo'
// constants
const { dataActions: { profile: { getProfile } } } = dataActions

function getRoutes (store) {
  return (
    <Route
      path='/'
      component={MainLayout}
      onEnter={(nextState, replace, proceed) => preloadUser(proceed, store)}
    >
      <IndexRedirect to='customer' />
      <Route path='customer/:id' >
        <IndexRedirect to='wallet' />
        <Route path='checkout' component={Checkout}/>
        <Route path='wallet' component={CustomerWallet} />
        <Route path='transactions' component={TransactionHistory} />
        <Route path='transactions/:address' component={RecentTransactions} />
      </Route>
      <Route path='vendor/:id' >
        <IndexRedirect to='wallet' />
        <Route path='profile' component={Profile} />
        <Route path='wallet' component={VendorWallet} />
      </Route>
      <Route path='demonstrator/:id' >
        <IndexRedirect to='demo' />
        <Route path='demo' component={Demo} />
      </Route>
      <Route path='*' component={NotFound} status={404} />
    </Route>
  )
}

function preloadUser(proceed, { getState, dispatch }) {
  const { data } = getState().data.profile

  if(!data){

    dispatch(getProfile())
      .then(({ userType, id }) => {
        browserHistory.replace(`/${userType}/${id}`)
      })
      .catch(response => proceed())
  }
  else {
    const { userType, id } = data

    browserHistory.replace(`/${userType}/${id}`)
  }

  proceed()
}

export default getRoutes
