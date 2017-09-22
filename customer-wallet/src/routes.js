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
import NotFound from './components/NotFound/'

function getRoutes (store) {
  return (
    <Route
      path='/'
      component={MainLayout}
      onEnter={(nextState, replace, proceed) => preloadUser(proceed, store)}
    >
      <IndexRedirect to='customer' />
      <Route path='customer' >
        <IndexRedirect to='wallet' />
        <Route path='checkout' component={Checkout}/>
        <Route path='wallet' component={CustomerWallet} />
        <Route path='profile' component={Profile} />
      </Route>
      <Route path='vendor' >
        <IndexRedirect to='wallet' />
        <Route path='profile' component={Profile} />
        <Route path='wallet' component={VendorWallet} />
      </Route>
      <Route path='*' component={NotFound}/>
    </Route>
  )
}

function preloadUser(proceed, { getState, dispatch }) {
  const { data } = getState().data.profile

  if(!data){
    dispatch(getProfile())
      .then(({ userType }) => {
        if(userType === 'vendor') {
          browserHistory.replace('/vendor')
        }
        else {
          browserHistory.replace('/customer')
        }
      })
      .catch(response => proceed())
  }
  else {
    const { userType } = data

    if(userType === 'vendor') {
      browserHistory.replace('/vendor')
    }
    else {
      browserHistory.replace('/customer')
    }
  }

  proceed()
}

export default getRoutes
