import React from 'react'
import { Route, Switch, Redirect } from 'react-router'
import CreateWallet from './Create/index'
import ImportWallet from './Import/index'
import LoginPage from './LoginPage'
import { connect } from 'react-redux';

function WalletRouter({ wallet }) {
  const emptyWallet = !wallet || !wallet.did
  return <Switch>
    {!emptyWallet && <Redirect to='/claim'/>}
    <Route path='/setup/create' component={CreateWallet} />
    <Route path='/setup/import' component={ImportWallet} />
    <Route path='/setup' component={LoginPage} />
  </Switch>
}

export default connect(
  state => ({
    wallet: state.data.wallet
  })
)(WalletRouter)