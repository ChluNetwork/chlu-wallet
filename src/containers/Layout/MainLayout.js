import React, { Component } from 'react'
import { any } from 'prop-types'
// libs
import ReduxToastr from 'react-redux-toastr'
import { Route, Switch, Redirect, withRouter } from 'react-router'
import { connect } from 'react-redux'
// toastr
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import { compose } from 'recompose'
// styles
import CssBaseline from '@material-ui/core/CssBaseline'
import ChluLayout from './ChluLayout'
// routes
import HomePage from '../HomePage'
import LoginPage from '../Wallet/Import'
import Reputation from '../Reputation'
import Transactions from '../Transactions'
import Settings from '../Settings'
import Payment from '../Payment'
import Reviews from '../Reviews'

class MainLayout extends Component {
  static propTypes = {
    children: any,
  }

  render () {
    const {
      wallet,
    } = this.props
    // TODO: handle profile loading?
    const emptyWallet = !wallet || !wallet.did

    return (
      <CssBaseline>
        <ChluLayout>
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route path='/login' component={LoginPage} />
            {emptyWallet && <Redirect to='/'/>}
            <Route path='/reputation' component={Reputation} />
            <Route path='/pay' component={Payment} />
            <Route path='/transactions' component={Transactions} />
            <Route path='/settings' component={Settings} />
            <Route path='/reviews' component={Reviews} />
            <Redirect to='/'/>
          </Switch>
        </ChluLayout>
        <ReduxToastr
          timeOut={5000}
          preventDuplicates
          position='top-right'
          transitionIn='fadeIn'
          transitionOut='fadeOut'
          newestOnTop
        />
      </CssBaseline>
    )
  }
}

const mapStateToProps = state => ({
  profile: state.data.profile,
  wallet: state.data.wallet
})

export default compose(
  withRouter, // prevent component not rerendering on route change
  connect(mapStateToProps)
)(MainLayout)
