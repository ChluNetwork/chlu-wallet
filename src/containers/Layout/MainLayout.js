import React, { Component } from 'react'
import { any } from 'prop-types'
// libs
import ReduxToastr from 'react-redux-toastr'
import { Route, Switch, Redirect, withRouter } from 'react-router'
import { connect } from 'react-redux'
import { Helmet } from "react-helmet";


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
import ReviewsIWrote from '../ReviewsIWrote'
import Transactions from '../Transactions'
import Settings from '../Settings'
import Profile from '../Profile'
import Payment from '../Payment'
import Terms from '../Terms'
import Search from '../Search'

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
      <Helmet>
          <meta charSet='utf-8' />
          <title>Chlu - Pay, Review, Earn Chlu</title>
          <link rel='shortcut icon' href='/favicon.ico'/>
          <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png'/>
          <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png'/>
          <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png'/>
          <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#5bbad5'/>
          <meta name='msapplication-TileColor' content='#da532c'/>
          <meta name='theme-color' content='#ffffff'/>
      </Helmet>
        <ChluLayout>
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route path='/login' component={LoginPage} />
            <Route path='/terms' component={Terms} />
            <Route path='/profile/:id' component={Profile} />
            {emptyWallet && <Redirect to='/'/>}
            <Route path='/search' component={Search} />
            <Route path='/pay/:multihash?' component={Payment} />
            <Route path='/reputation' component={Reputation} />
            <Route path='/wrote' component={ReviewsIWrote} />
            <Route path='/transactions' component={Transactions} />
            <Route path='/settings/profile' render={() => <Settings tabIndex={0} />} />
            <Route path='/settings/wallet' render={() => <Settings tabIndex={1} />} />
            <Redirect from='/settings' to='/settings/profile' />
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
