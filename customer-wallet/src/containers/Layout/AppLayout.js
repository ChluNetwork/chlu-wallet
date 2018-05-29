import React from 'react'
import { any, func, bool, string, object } from 'prop-types'
import { Route, Switch, Redirect } from 'react-router'
// redux
import { connect } from 'react-redux'
import { toggleDrawer } from 'store/modules/ui/drawer'
// components
import Drawer from 'components/Drawer'
import CircularProgress from '@material-ui/core/CircularProgress';
import ChluAppBar from './AppBar'
// routes
import ClaimReputation from '../ClaimReputation'
import Transactions from '../Transactions'
import Settings from '../Settings'
import NotFound from '../../components/NotFound'
import Payment from '../Payment'

const AppLayout = ({
  children,
  toggleDrawer,
  drawerOpen,
  changeUserType,
  profile,
  isSwitchUserMenuOpen,
  toggleSwitchUserMenuShow
}) => {
  const { loading, error } = profile

  return (
    <div>
      {loading ? <CircularProgress/> : error
        ? 'Something went wrong'
        : <div>
          <ChluAppBar />
          <Drawer toggleDrawer={toggleDrawer} drawerOpen={drawerOpen} />
          <Switch>
            <Route path='/claim' component={ClaimReputation} />
            <Route path='/pay' component={Payment} />
            <Route path='/transactions' component={Transactions} />
            <Route path='/settings' component={Settings} />
            <Redirect exact from='/' to='/setup' />
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
  profile: state.data.profile
})

const mapDispatchToProps = dispatch => ({
  toggleDrawer: () => dispatch(toggleDrawer()),
})

export default connect(mapStateToProps, mapDispatchToProps)(AppLayout)
