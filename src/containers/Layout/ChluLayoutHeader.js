import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import { push } from 'react-router-redux'
import { withRouter } from 'react-router'
import { compose } from 'recompose'
import { connect } from 'react-redux'
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
// icons
import Menu from "@material-ui/icons/Menu";
import TransactionsIcon from '@material-ui/icons/AccountBalanceWallet';
import PayIcon from '@material-ui/icons/Send';
import SettingsIcon from '@material-ui/icons/Settings'
import LoginIcon from '@material-ui/icons/Fingerprint'
import ReputationIcon from '@material-ui/icons/Star'
// style
import logo from "images/chlu.svg";
import pagesHeaderStyle from "styles/material-dashboard-pro-react/components/pagesHeaderStyle.jsx";

class ChluLayoutHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
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
    const { classes, color, wallet, push } = this.props;
    const appBarClasses = cx({
      [" " + classes[color]]: color
    });
    const loggedInList = (
      <List className={classes.list}>
        <ListItem className={classes.listItem}>
          <NavLink to={"/reputation"} className={classes.navLink} activeClassName={classes.navLinkActive}>
            <ListItemIcon className={classes.listItemIcon}>
              <ReputationIcon/>
            </ListItemIcon>
            <ListItemText
              primary={"My Reputation"}
              disableTypography={true}
              className={classes.listItemText}
              />
          </NavLink>
        </ListItem>
        <ListItem className={classes.listItem}>
          <NavLink to={"/pay"} className={classes.navLink} activeClassName={classes.navLinkActive}>
            <ListItemIcon className={classes.listItemIcon}>
              <PayIcon/>
            </ListItemIcon>
            <ListItemText
              primary={"Pay & Review"}
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
              primary={"Transactions"}
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
      </List>
    );
    const loggedOutList = (
      <List className={classes.list}>
        <ListItem className={classes.listItem}>
          <NavLink to={"/setup/import"} className={classes.navLink} activeClassName={classes.navLinkActive}>
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
              <img src={logo} alt="logo" className={classes.logo} />
            </Link>
            <Button onClick={() => push('/')} className={classes.title}>
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
  wallet: state.data.wallet
})

const mapDispatchToProps = dispatch => ({
  push
})

export default compose(
  withRouter, // prevent NavLinks not realising the route has changed
  withStyles(pagesHeaderStyle),
  connect(mapStateToProps, mapDispatchToProps)
)(ChluLayoutHeader);
