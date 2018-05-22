import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router'
import { connect } from 'react-redux'
// Helpers
import replace from 'helpers/replace'
// Components
import TransactionHistory from './Transactions/TransactionHistory'
import RecentTransactions from './Transactions/RecentTransactions'
import CustomerWallet from './CustomerWallet'
import Checkout from './Checkout'
import Settings from './Settings'
import { CircularProgress } from '@material-ui/core';
// Redux
import { getProfile } from 'store/modules/data/profile'

class Customer extends Component {

    componentDidMount() {
        if (!localStorage.getItem('mnemonic_key')) {
            replace('/wallet')
        }
        if (!this.props.profile.data) {
            this.props.getProfile('customer')
        }
    }

    render() {
        if (this.props.profile) {
            return <Switch>
                <Route path='/customer/checkout' component={Checkout}/>
                <Route path='/customer/wallet' component={CustomerWallet} />
                <Route path='/customer/transactions/:address' component={RecentTransactions} />
                <Route path='/customer/transactions' component={TransactionHistory} />
                <Route path='/customer/settings' component={Settings} />
                <Redirect exact from='/customer' to='/customer/checkout' />
            </Switch>
        } else {
            return <CircularProgress />
        }
    }
}

function mapStateToProps(state) {
    return {
        profile: state.data.profile
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getProfile: x => dispatch(getProfile(x))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Customer)