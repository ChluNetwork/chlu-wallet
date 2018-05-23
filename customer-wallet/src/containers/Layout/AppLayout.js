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
import Customer from '../Customer'
import Vendor from '../Vendor'
import NotFound from '../../components/NotFound'
import Demo from '../Demonstrator/Demo'

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
            <Route path='/customer' component={Customer} />
            <Route path='/vendor' component={Vendor} />>
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
  profile: state.data.profile
})

const mapDispatchToProps = dispatch => ({
  toggleDrawer: () => dispatch(toggleDrawer()),
})

export default connect(mapStateToProps, mapDispatchToProps)(AppLayout)
