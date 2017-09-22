import React from 'react'
import PropTypes from 'prop-types'
// redux
import { connect } from 'react-redux'
import { toggleDrawer } from 'store/modules/ui/drawer'
import { changeUserType } from 'store/modules/data/profile'
// libs
import ReduxToastr from 'react-redux-toastr'
// components
import AppBar from 'material-ui/AppBar'
import Drawer from 'components/Drawer'
import FlatButton from 'material-ui/FlatButton'
import CircularProgress from 'material-ui/CircularProgress'


const loaderStyle = {
  margin: '20px auto'
}

const buttonStyle = {
  color: 'rgb(255, 255, 255)',
  marginTop: '12.5px'
}

const MainLayout = ({ children, toggleDrawer, drawerOpen, changeUserType, profile }) => {
  const { loading, data } = profile
  const userType = data ? data.userType : null
  const nextUserType = userType === 'customer' ? 'vendor' : 'customer'

  return (
    <div>
      {loading
        ? <CircularProgress style={loaderStyle} />
        : <div>
          <Drawer toggleDrawer={toggleDrawer} drawerOpen={drawerOpen} />
          <AppBar
            title='Chlu'
            iconClassNameRight='muidocs-icon-navigation-expand-more'
            onLeftIconButtonTouchTap={toggleDrawer}
          >
            <FlatButton
              style={buttonStyle}
              label={`switch to ${nextUserType}`}
              onClick={() => changeUserType(nextUserType)}
            />
          </AppBar>
          {children}
          <ReduxToastr
            timeOut={4000}
            preventDuplicates
            position='top-right'
            transitionIn='fadeIn'
            transitionOut='fadeOut'
            newestOnTop
          />
        </div>
      }
    </div>
  )
}

MainLayout.propTypes = {
  children: PropTypes.any,
  toggleDrawer: PropTypes.func.isRequired,
  drawerOpen: PropTypes.bool,
  changeUserType: PropTypes.func,
  userType: PropTypes.string
}

const mapStateToProps = state => ({
  drawerOpen: state.ui.drawer.open,
  profile: state.data.profile
})

const mapDispatchToProps = dispatch => ({
  toggleDrawer: () => dispatch(toggleDrawer()),
  changeUserType: data => dispatch(changeUserType(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout)
