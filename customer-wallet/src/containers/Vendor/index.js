import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router'
// Helpers
import replace from 'helpers/replace'
// Components
import VendorWallet from './VendorWallet'
import Profile from './Profile'

class Vendor extends Component {

    componentDidMount() {
        if (!localStorage.getItem('mnemonic_key')) {
            replace('/wallet')
        }
    }

    render() {
        return <Switch>
            <Route path='/vendor/profile' component={Profile} />
            <Route path='/vendor/wallet' component={VendorWallet} />
            <Redirect exact from='/vendor' to='/vendor/wallet'/>
        </Switch>
    }
}

export default Vendor