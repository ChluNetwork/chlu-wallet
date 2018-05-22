import React from 'react'
import { any, func, bool, string, object } from 'prop-types'
import { Route, Switch, Redirect } from 'react-router'
// redux
import { connect } from 'react-redux'
import { toggleDrawer } from 'store/modules/ui/drawer'
import { changeUserType } from 'store/modules/data/profile'
import { toggleSwitchUserMenuShow } from 'store/modules/ui/switchUserMenu'
// components
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar';
import Drawer from 'components/Drawer'
import CircularProgress from '@material-ui/core/CircularProgress';
import SwitchUserMenu from './SwitchUserMenu'
// routes
import CustomerWallet from '../Customer/CustomerWallet'
import Settings from '../Customer/Settings'
import VendorWallet from '../Vendor/VendorWallet'
import Checkout from '../Customer/Checkout'
import Profile from '../Vendor/Profile'
import TransactionHistory from '../Customer/Transactions/TransactionHistory'
import RecentTransactions from '../Customer/Transactions/RecentTransactions'
import NotFound from '../../components/NotFound'
import Demo from '../Demonstrator/Demo'
// helpers
import replace from 'helpers/replace'
// data
import usersType from 'fixtures/usersType'
// styles
import { withStyles } from '@material-ui/core';
import style from 'styles/inlineStyles/containers/MainLayout'
// assets
import chluLogo from 'images/svg/chlu-2.svg'

const { circularProgressStyle, AppBarStyle } = style

const StyledAppBar = withStyles(AppBarStyle)(AppBar)

const AppLayout = ({
  children,
  classes,
  toggleDrawer,
  drawerOpen,
  changeUserType,
  profile,
  isSwitchUserMenuOpen,
  toggleSwitchUserMenuShow
}) => {
  const { loading, data, error } = profile
  const userType = data ? data.userType : ''

  return (
    <div>
      {loading ? <CircularProgress {...circularProgressStyle} /> : error
        ? 'Something went wrong'
        : <div>
          <Drawer toggleDrawer={toggleDrawer} drawerOpen={drawerOpen} />
          <StyledAppBar
            position='static'
          >
            <Toolbar>
              <IconButton onClick={toggleDrawer} className={classes.menuButton} color="inherit">
                <MenuIcon />
              </IconButton>
              <img src={chluLogo} className='navbar-logo' alt='logo' />
              <SwitchUserMenu
                items={usersType}
                userType={userType}
                isOpen={isSwitchUserMenuOpen}
                onRequestChange={toggleSwitchUserMenuShow}
                onItemClick={changeUserType}
              />

            </Toolbar>
          </StyledAppBar>
          <Switch>
            <Route path='/customer' onEnter={(nextState, replace, proceed) => checkMissingMnemonic(proceed)}>
              <Switch>
                <Route path='/customer/checkout' component={Checkout}/>
                <Route path='/customer/wallet' component={CustomerWallet} />
                <Route path='/customer/transactions/:address' component={RecentTransactions} />
                <Route path='/customer/transactions' component={TransactionHistory} />
                <Route path='/customer/settings' component={Settings} />
                <Redirect exact from='/customer' to='/customer/checkout' />
              </Switch>
            </Route>
            <Route path='/vendor'>
              <Switch>
                <Route path='/vendor/profile' component={Profile} />
                <Route path='/vendor/wallet' component={VendorWallet} />
                <Redirect exact from='/vendor' to='/vendor/wallet'/>
              </Switch>
            </Route>
            <Route path='/demonstrator'>
              <Switch>
                <Route path='/demonstrator/demo' component={Demo} />
                <Redirect exact from='/demonstrator' to='/demonstrator/demo' />
              </Switch>
            </Route>
            <Redirect exact from='/' to='/wallet' />
            <Route component={NotFound} status={404} />
          </Switch>
        </div>
      }
    </div>
  )
}

AppLayout.propTypes = {
  children: any,
  classes: object.isRequired,
  toggleDrawer: func,
  drawerOpen: bool,
  changeUserType: func,
  userType: string,
  isSwitchUserMenuOpen: bool,
  toggleSwitchUserMenuShow: func
}

const mapStateToProps = state => ({
  drawerOpen: state.ui.drawer.open,
  profile: state.data.profile,
  isSwitchUserMenuOpen: state.ui.switchUserMenu.isOpen
})

const mapDispatchToProps = dispatch => ({
  toggleDrawer: () => dispatch(toggleDrawer()),
  changeUserType: (userType) => dispatch(changeUserType(userType)),
  toggleSwitchUserMenuShow: () => dispatch(toggleSwitchUserMenuShow())
})

function checkMissingMnemonic(proceed) {
  if (!localStorage.getItem('mnemonic_key')) {
    replace('/')
  }

  proceed()
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles({})(AppLayout))
