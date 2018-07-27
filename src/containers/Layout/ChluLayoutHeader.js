import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";
// routing
import { Link, NavLink } from "react-router-dom";
import { push } from 'react-router-redux'
import { withRouter } from 'react-router'
// components
import {
    withStyles,
    AppBar,
    Toolbar,
    IconButton,
    Button,
    Hidden,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText
 } from "@material-ui/core";
import ConfirmActionModal from 'components/Modals/ConfirmActionModal';
// icons
import Menu from "@material-ui/icons/Menu";
import TransactionsIcon from '@material-ui/icons/AccountBalanceWallet';
import PayIcon from '@material-ui/icons/Send';
import SettingsIcon from '@material-ui/icons/Settings'
import LoginIcon from '@material-ui/icons/Fingerprint'
import ReputationIcon from '@material-ui/icons/Star'
import ThumbsUpDown from '@material-ui/icons/ThumbsUpDown'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
// redux
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { deleteWallet, closeDeleteModal, openDeleteModal } from 'store/modules/data/wallet'
// style
import ChluLogo from "./ChluLogo";
import pagesHeaderStyle from "styles/material-dashboard-pro-react/components/pagesHeaderStyle.jsx";

class ChluLayoutHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  deleteWallet = () => {
    this.props.deleteWallet()
    // if the user logs out on the homepage the wizard will be in an
    // inconsistent state. To avoid heavily refactoring it now, this
    // workaround reloads the app instead
    // TODO: replace this workaround with a real fix
    window.location.reload()
  }


  handleDrawerToggle = () => {
    this.setState({ open: !this.state.open });
  };

  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName) {
    // TODO: review this
    return this.props.location.pathname.indexOf(routeName) > -1 ? true : false;
  }

  render() {
    const { wallet, classes, isModalOpen, closeDeleteModal, openDeleteModal, color, push } = this.props
    const appBarClasses = cx({
      [" " + classes[color]]: color
    });
    const loggedInList = (
      <List className={classes.list}>
        <ListItem className={classes.listItem}>
          <NavLink to={"/pay"} className={classes.navLink} activeClassName={classes.navLinkActive}>
            <ListItemIcon className={classes.listItemIcon}>
              <PayIcon/>
            </ListItemIcon>
            <ListItemText
              primary={"Pay, Review, Earn Chlu"}
              disableTypography={true}
              className={classes.listItemText}
              />
          </NavLink>
        </ListItem>
        <ListItem className={classes.listItem}>
          <NavLink to={"/reputation"} className={classes.navLink} activeClassName={classes.navLinkActive}>
            <ListItemIcon className={classes.listItemIcon}>
              <ReputationIcon/>
            </ListItemIcon>
            <ListItemText
              primary={"Reviews About Me"}
              disableTypography={true}
              className={classes.listItemText}
              />
          </NavLink>
        </ListItem>
        <ListItem className={classes.listItem}>
          <NavLink to={"/wrote"} className={classes.navLink} activeClassName={classes.navLinkActive}>
            <ListItemIcon className={classes.listItemIcon}>
              <ThumbsUpDown/>
            </ListItemIcon>
            <ListItemText
              primary={"Reviews I Wrote"}
              disableTypography={true}
              className={classes.listItemText}
              />
          </NavLink>
        </ListItem>
        <ListItem className={classes.listItem}>
          <NavLink to={"/transactions"} className={classes.navLink} activeClassName={classes.navLinkActive}>
            <ListItemIcon className={classes.listItemIcon}>
              <TransactionsIcon/>
            </ListItemIcon>
            <ListItemText
              primary={"All Transactions"}
              disableTypography={true}
              className={classes.listItemText}
              />
          </NavLink>
        </ListItem>
        <ListItem className={classes.listItem}>
          <NavLink to={"/settings"} className={classes.navLink} activeClassName={classes.navLinkActive}>
            <ListItemIcon className={classes.listItemIcon}>
              <SettingsIcon/>
            </ListItemIcon>
            <ListItemText
              primary={"Settings"}
              disableTypography={true}
              className={classes.listItemText}
              />
          </NavLink>
        </ListItem>
        <ListItem className={classes.listItem}>
          <NavLink to={"/logout"} className={classes.navLink} activeClassName={classes.navLinkActive} onClick={openDeleteModal}>
            <ListItemIcon className={classes.listItemIcon}>
              <ExitToAppIcon/>
            </ListItemIcon>
            <ListItemText
              primary={"Logout"}
              disableTypography={true}
              className={classes.listItemText}
              />
          </NavLink>
        </ListItem>
        <ConfirmActionModal
          isOpen={isModalOpen}
          confirm={this.deleteWallet.bind(this)}
          cancel={closeDeleteModal}
          text='To log back in you need to know your wallet credentials: 1) your Decentralized Identifier (DID) or username; 2) your wallet private key. If you have not done so already, you can download the wallet credentials from the Settings tab before logging out to ensure you do not lose your funds and identity!'
        />
      </List>

    );
    const loggedOutList = (
      <List className={classes.list}>
        <ListItem className={classes.listItem}>
          <NavLink to={"/login"} className={classes.navLink} activeClassName={classes.navLinkActive}>
            <ListItemIcon className={classes.listItemIcon}>
              <LoginIcon/>
            </ListItemIcon>
            <ListItemText
              primary={"Login"}
              disableTypography={true}
              className={classes.listItemText}
              />
          </NavLink>
        </ListItem>
      </List>
    )
    const emptyWallet = !wallet || !wallet.did
    const list = emptyWallet ? loggedOutList : loggedInList
    return (
      <AppBar position='static' className={classes.appBar + appBarClasses}>
        <Toolbar className={classes.container}>
          <div className={classes.flex}>
            <Link to='/'>
            <div className={classes.logo}>
              <ChluLogo /> hlu</div>
            </Link>
            <Button onClick={() => push('/')} className={classes.logotag}>
              Your Reputation Wallet
            </Button>
          </div>
          <Hidden smDown implementation="css">
            {list}
          </Hidden>
          <Hidden mdUp>
            <IconButton
              className={classes.sidebarButton}
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerToggle}
            >
              <Menu />
            </IconButton>
          </Hidden>
          <Hidden mdUp implementation="css">
            <Hidden mdUp>
              <Drawer
                variant="temporary"
                anchor={"right"}
                open={this.state.open}
                classes={{
                  paper: classes.drawerPaper
                }}
                onClose={this.handleDrawerToggle}
                ModalProps={{
                  keepMounted: true // Better open performance on mobile.
                }}
              >
                {list}
              </Drawer>
            </Hidden>
          </Hidden>
        </Toolbar>
      </AppBar>
    );
  }
}

ChluLayoutHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"])
};

const mapStateToProps = state => ({
  wallet: state.data.wallet,
  isModalOpen: state.data.wallet.isDeleteModalOpen
})


const mapDispatchToProps = {
  deleteWallet,
  closeDeleteModal,
  openDeleteModal,
  push
}

export default compose(
  withRouter, // prevent NavLinks not realising the route has changed
  withStyles(pagesHeaderStyle),
  connect(mapStateToProps, mapDispatchToProps)
)(ChluLayoutHeader);
