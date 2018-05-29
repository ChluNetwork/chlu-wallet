import React from 'react'
import { Route, Switch } from 'react-router'
import CreateWallet from './Create/index'
import ImportWallet from './Import/index'
import Wallet from './Wallet'

export default function WalletRouter(props) {
  return <Switch>
    <Route path='/setup/create' component={CreateWallet} />
    <Route path='/setup/import' component={ImportWallet} />
    <Route path='/setup' component={Wallet} />
  </Switch>
}