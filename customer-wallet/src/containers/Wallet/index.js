import React from 'react'
import { Route, Switch, Redirect } from 'react-router'
import CreateWallet from './Create/index'
import ImportWallet from './Import/index'
import Wallet from './Wallet'
import { connect } from 'react-redux';

function WalletRouter({ wallet }) {
  return <Switch>
    {wallet && <Redirect to='/claim'/>}
    <Route path='/setup/create' component={CreateWallet} />
    <Route path='/setup/import' component={ImportWallet} />
    <Route path='/setup' component={Wallet} />
  </Switch>
}

export default connect(
  state => ({
    wallet: state.data.wallet
  })
)(WalletRouter)