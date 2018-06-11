import React from 'react'
import { Route, Switch, Redirect } from 'react-router'
import CreateWallet from './Create/index'
import ImportWallet from './Import/index'
import { connect } from 'react-redux';

function WalletRouter({ wallet }) {
  const emptyWallet = !wallet || !wallet.did
  return <Switch>
    {!emptyWallet && <Redirect to='/reputation'/>}
    <Route path='/setup/create' component={CreateWallet} />
    <Route path='/setup/import' component={ImportWallet} />
    <Redirect from='/setup' to='/homepage' />
  </Switch>
}

export default connect(
  state => ({
    wallet: state.data.wallet
  })
)(WalletRouter)