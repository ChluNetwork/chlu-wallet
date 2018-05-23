import React from 'react'
import { Route, Switch } from 'react-router'
import CreateWallet from './Create/index'
import ImportWallet from './Import/index'
import Wallet from './Wallet'

export default function WalletRouter(props) {
  return <Switch>
    <Route path='/wallet/create' component={CreateWallet} />
    <Route path='/wallet/import' component={ImportWallet} />
    <Route path='/wallet' component={Wallet} />
  </Switch>
}