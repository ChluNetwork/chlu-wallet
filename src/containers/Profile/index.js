import React, { Component } from 'react'
import { object } from 'prop-types'
import { get } from 'lodash'

// components
import { Card, CardContent, CardActions, CardHeader, Grid, InputAdornment } from '@material-ui/core'
import { Avatar, withStyles, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import ReactCopyToClipBoard from 'react-copy-to-clipboard'

// redux
import { compose } from 'recompose';
import { connect } from 'react-redux'

// helpers
import { getAddress } from 'helpers/wallet';
import profileProvider from 'helpers/profileProvider';

import CustomInput from 'components/MaterialDashboardPro/CustomInput';
import PictureUpload from 'components/MaterialDashboardPro/PictureUpload'

// icons
import Email from '@material-ui/icons/Email';
import Face from '@material-ui/icons/Face';
import UserIcon from '@material-ui/icons/Person'
import WalletIcon from '@material-ui/icons/AccountBalanceWallet'
import ProfileIcon from '@material-ui/icons/AccountCircle'

import Payment from '../Payment'
import BusinessLocation from './BusinessLocation'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
  card: {
    margin: '30px'
  }
});

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {},
      loading: true
    };
  }

  componentDidMount() {
    const didId = this.props.match.params.id;
    profileProvider.getProfile(didId).then(profile => this.setState({ profile: profile || {}, loading: false }));
  }

  componentDidUpdate(prevProps) {
    const didId = this.props.match.params.id;
    if (didId !== prevProps.match.params.id) {
      this.setState({
        loading: true
      }, () => {
        profileProvider.getProfile(didId).then(profile => this.setState({ profile: profile || {}, loading: false }));
      })
    }
  }

  static propTypes = {
    wallet: object
  }

  render () {
    const { classes } = this.props
    const { loading, profile } = this.state

    const didId = this.props.match.params.id

    return(
      <div>
        <Card className={classes.card}>
          { !loading && <CardHeader
            avatar={<Avatar><ProfileIcon/></Avatar>}
            title='Profile'
            subheader='Profile Page'
          /> }

          { loading && <CardHeader
            avatar={<Avatar><ProfileIcon/></Avatar>}
            title='Profile'
            subheader='Loading...'
          /> }

          <CardContent>
            {!loading && this.renderUser()}
            {!loading && this.renderBusiness()}
          </CardContent>
        </Card>
        { !loading && <Payment profile={profile} didId={didId} /> }
      </div>
    )
  }

  renderWallet() {
    const { classes, wallet } = this.props
    const address = getAddress(wallet)
    const didId = get(wallet, 'did.publicDidDocument.id', '')

    return (
      <div>
        <Card className={classes.card}>
          <CardHeader
            avatar={<Avatar><WalletIcon/></Avatar>}
            title='Wallet'
            subheader='Distributed Identity and Bitcoin Funds'
          />

          <CardContent>
            <List dense disablePadding>
              <ReactCopyToClipBoard text={didId}>
                <ListItem button>
                  <ListItemIcon>
                    <UserIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary='Distributed Identity (DID)'
                    secondary={`${didId} - Click to copy to clipboard`}
                  />
                </ListItem>
              </ReactCopyToClipBoard>

              <ReactCopyToClipBoard text={address}>
                <ListItem button>
                  <ListItemIcon>
                    <WalletIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary='Bitcoin Address (testnet)'
                    secondary={`${address} - Click to copy to clipboard`}
                  />
                </ListItem>
              </ReactCopyToClipBoard>
            </List>
          </CardContent>
        </Card>
      </div>
    )
  }

  renderUser() {
    const { classes } = this.props;
    const { profile } = this.state;

    if (profile.businessname || profile.location) return undefined;

    return (
      <div>
        <Grid container justify='center' spacing={16}>
          <Grid item xs={12} sm={12} md={12}>
            <PictureUpload />
            <div className={classes.description}>Upload Photo</div>
          </Grid>

          <Grid item xs={12} sm={12} md={5}>
            <CustomInput
              success={this.state.emailState === 'success'}
              error={this.state.emailState === 'error'}
              labelText='Email'
              id='email'
              formControlProps={{ fullWidth: true }}
              inputProps={{
                value: profile.email || "",
                disabled: true,
                endAdornment: (
                  <InputAdornment position='end' className={classes.inputAdornment}>
                    <Email className={classes.inputAdornmentIcon} />
                  </InputAdornment>
                )
              }}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={5}>
            <CustomInput
              success={this.state.usernameState === 'success'}
              error={this.state.usernameState === 'error'}
              labelText='User Name'
              id='username'
              formControlProps={{ fullWidth: true }}
              inputProps={{
                value: profile.username || "",
                disabled: true,
                endAdornment: (
                  <InputAdornment position='end' className={classes.inputAdornment}>
                    <Face className={classes.inputAdornmentIcon} />
                  </InputAdornment>
                )
              }}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={5}>
            <CustomInput
              success={this.state.firstnameState === 'success'}
              error={this.state.firstnameState === 'error'}
              labelText='First Name'
              id='firstname'
              formControlProps={{ fullWidth: true }}
              inputProps={{
                value: profile.firstname || "",
                disabled: true,
                endAdornment: (
                  <InputAdornment position='end' className={classes.inputAdornment}>
                    <Face className={classes.inputAdornmentIcon} />
                  </InputAdornment>
                )
              }}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={5}>
            <CustomInput
              success={this.state.lastnameState === 'success'}
              error={this.state.lastnameState === 'error'}
              labelText='Last Name'
              id='lastname'
              formControlProps={{ fullWidth: true }}
              inputProps={{
                value: profile.lastname || "",
                disabled: true,
                endAdornment: (
                  <InputAdornment position='end' className={classes.inputAdornment}>
                    <Face className={classes.inputAdornmentIcon} />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
        </Grid>
      </div>
    )
  }

  renderBusiness() {
    const { profile } = this.state;

    if (!profile.businessname && !profile.location) return undefined;

    return (
      <div>
        <Grid container justify='center' spacing={16}>
          <Grid item xs={12} sm={12} md={12}>
            <PictureUpload />
          </Grid>

          <Grid item xs={12} sm={12} md={5}>
            <CustomInput
              success={this.state.emailState === 'success'}
              error={this.state.emailState === 'error'}
              labelText='Name'
              id='businessname'
              formControlProps={{ fullWidth: true }}
              inputProps={{
                value: profile.businessname || "",
                disabled: true
              }}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={5}>
            <CustomInput
              success={this.state.usernameState === 'success'}
              error={this.state.usernameState === 'error'}
              labelText='Business Type'
              id='description'
              formControlProps={{ fullWidth: true }}
              inputProps={{
                value: profile.businesstype || "",
                disabled: true
              }}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={5}>
            <BusinessLocation location={profile.businesslocationgeo} />
          </Grid>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = store => {
  return {
    wallet: store.data.wallet,
    profile: store.ui.profile.profile || {}
  };
};

export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(Profile)
