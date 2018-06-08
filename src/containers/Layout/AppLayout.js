import React, { Component } from 'react'
import { object } from 'prop-types'
import { Route, Switch, Redirect } from 'react-router'
// redux
import { connect } from 'react-redux'
import { compose } from 'recompose'
// components
import CircularProgress from '@material-ui/core/CircularProgress';
// routes
import Reputation from '../Reputation'
import Transactions from '../Transactions'
import Settings from '../Settings'
import Payment from '../Payment'
import Reviews from '../Reviews'
// style
import { withStyles } from '@material-ui/core';
const style = {
  container: {
    marginTop: '100px'
  }
}

class AppLayout extends Component {

  render() {
    const {
      profile,
      wallet,
      classes
    } = this.props
    const { loading, error } = profile
    const emptyWallet = !wallet || !wallet.did

    return (
      <div>
        {loading ? <CircularProgress/> : error
          ? 'Something went wrong'
          : <div className={classes.container}>
            <Switch>
              {emptyWallet && <Redirect to='/homepage'/>}
              <Route path='/reputation' component={Reputation} />
              <Route path='/pay' component={Payment} />
              <Route path='/transactions' component={Transactions} />
              <Route path='/settings' component={Settings} />
              <Route path='/reviews' component={Reviews} />
              <Redirect to='/reputation'/>
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

export default compose(
  withStyles(style),
  connect(mapStateToProps)
)(AppLayout)
