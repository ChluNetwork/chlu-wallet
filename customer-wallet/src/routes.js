import React from 'react'
import { Route, IndexRoute } from 'react-router'
// containers
import MainLayout from './containers/MainLayout'
import CustomerWallet from './containers/CustomerWallet'
import Checkout from './containers/Checkout'
import Profile from './containers/Profile'

function getRoutes () {

  return (
    <Route path='/' component={MainLayout}>
      <IndexRoute component={CustomerWallet} />
      <Route path='checkout' component={Checkout} />
      <Route path='profile' component={Profile} />
    </Route>
  )
}

export default getRoutes