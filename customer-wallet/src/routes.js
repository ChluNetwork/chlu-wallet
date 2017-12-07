import React from 'react'
import { Route, IndexRedirect, browserHistory } from 'react-router'
// redux
import { getProfile } from 'store/modules/data/profile'
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

function getRoutes (store) {
  return (
    <Route
      path='/'
      component={MainLayout}
      onEnter={(nextState, replace, proceed) => preloadUser(nextState, proceed, store)}
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

function preloadUser(nextState, proceed, { getState, dispatch }) {
  const { data } = getState().data.profile
  const [ , nextUserType, nextId, ...rest ] = nextState.location.pathname.split('/')

  if (!data) {
    dispatch(getProfile(nextUserType))
      .then(({ userType, id }) => {
        const nextPath = [ nextUserType || userType, nextId || id, ...rest ].join('/')
        browserHistory.replace(`/${nextPath}`)
      })
      .catch(response => proceed())
  }

  proceed()
}

export default getRoutes
