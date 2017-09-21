import React from 'react'
import { Route, IndexRedirect } from 'react-router'
// containers
import MainLayout from './containers/MainLayout'
import CustomerWallet from './containers/Customer/CustomerWallet'
import VendorWallet from './containers/Vendor/VendorWallet'
import Checkout from './containers/Customer/Checkout'
import Profile from './containers/Vendor/Profile'

function getRoutes () {

  return (
    <Route path='/' component={MainLayout}>
      <IndexRedirect to='customer'/>
      <Route path='customer'>
        <IndexRedirect to='wallet' />
        <Route path='checkout' component={Checkout} />
        <Route path='wallet' component={CustomerWallet} />
        <Route path='profile' component={Profile} />
      </Route>
      <Route path='vendor'>
        <IndexRedirect to='wallet' />
        <Route path='profile' component={Profile} />
        <Route path='wallet' component={VendorWallet} />
      </Route>
    </Route>
  )
}

export default getRoutes