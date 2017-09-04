import React from 'react'
import { Route, IndexRoute } from 'react-router'
// containers
import MainLayout from './containers/MainLayout'
import CustomerWallet from './containers/CustomerWallet'

function getRoutes () {

  return (
    <Route path='/' component={MainLayout}>
      <IndexRoute component={CustomerWallet} />
    </Route>
  )
}

export default getRoutes