import React, { Component } from 'react'
import { object } from 'prop-types'
import { Route, Switch, Redirect } from 'react-router'
// redux
import { connect } from 'react-redux'
// components
import Sidebar from 'containers/Sidebar'
import CircularProgress from '@material-ui/core/CircularProgress';
import ChluAppBar from './AppBar'
// routes
import ClaimReputation from '../ClaimReputation'
import Transactions from '../Transactions'
import Settings from '../Settings'
import Payment from '../Payment'
import Reviews from '../Reviews'

class AppLayout extends Component {

  render() {
    const {
      profile,
      wallet
    } = this.props
    const { loading, error } = profile
    const emptyWallet = !wallet || !wallet.did

    return (
      <div>
        {loading ? <CircularProgress/> : error
          ? 'Something went wrong'
          : <div>
            <ChluAppBar />
            <Sidebar />
            <Switch>
              {emptyWallet && <Redirect to='/setup'/>}
              <Route path='/claim' component={ClaimReputation} />
              <Route path='/pay' component={Payment} />
              <Route path='/transactions' component={Transactions} />
              <Route path='/settings' component={Settings} />
              <Route path='/reviews' component={Reviews} />
              <Redirect to='/claim'/>
            </Switch>
          </div>
        }
      </div>
    )
  }

}

AppLayout.propTypes = {
  wallet: object
}

const mapStateToProps = state => ({
  profile: state.data.profile,
  wallet: state.data.wallet
})

export default connect(mapStateToProps)(AppLayout)
