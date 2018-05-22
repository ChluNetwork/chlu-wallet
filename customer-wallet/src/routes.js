import React from 'react'
import { Route, Switch } from 'react-router'
// helpers
import replace from 'helpers/replace'
// redux
import { getProfile } from 'store/modules/data/profile'
// containers
import MainLayout from './containers/Layout/MainLayout'
import AppLayout from './containers/Layout/AppLayout'
import Wallet from './containers/Wallet'

function getRoutes (store) {
  return (
    <MainLayout>
      <Switch>
        <Route path='/wallet' component={Wallet} />
        <Route
          component={AppLayout}
          onEnter={(nextState, replace, proceed) => preloadUser(nextState, proceed, store)}
        />
      </Switch>
    </MainLayout>
  )
}

async function preloadUser(nextState, proceed, { getState, dispatch }) {
  const { data } = getState().data.profile
  const [ , nextUserType, ...rest ] = nextState.location.pathname.split('/')

  if (!data) {
    try {
      const { userType } = await dispatch(getProfile(nextUserType))
      const nextPath = [ nextUserType || userType, ...rest ].join('/')
      replace(`/${nextPath}`)
    } catch (error) {
        console.log('error_____', error.message)
    }
  }
  
  proceed()
}

export default getRoutes
