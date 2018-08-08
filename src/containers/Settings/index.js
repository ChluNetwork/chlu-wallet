import React, { Component } from 'react'
import { object } from 'prop-types'
import { get } from 'lodash'

// components
import { Button, Card, CardContent, CardActions, CardHeader, Divider, Grid, InputAdornment } from '@material-ui/core'
import { Avatar, withStyles, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import ReactCopyToClipBoard from 'react-copy-to-clipboard'

// redux
import { compose } from 'recompose';
import { connect } from 'react-redux'

// helpers
import { downloadWallet, getAddress } from 'helpers/wallet';
import { debounce } from 'helpers/debounce';

// stores, or whatever...
import { fetchProfile, updateProfile, setProfile } from 'store/modules/ui/profile';

import CustomInput from 'components/MaterialDashboardPro/CustomInput';
import InfoArea from 'components/MaterialDashboardPro/InfoArea'
import PictureUpload from 'components/MaterialDashboardPro/PictureUpload'

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';



// icons
import Email from '@material-ui/icons/Email';
import Face from '@material-ui/icons/Face';
import DownloadIcon from '@material-ui/icons/FileDownload'
import UserIcon from '@material-ui/icons/Person'
import WalletIcon from '@material-ui/icons/AccountBalanceWallet'
import ProfileIcon from '@material-ui/icons/AccountCircle'
import KeyIcon from '@material-ui/icons/Lock'
import AccountBoxIcon from '@material-ui/icons/AccountBox'


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

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}


class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const didId = get(this.props.wallet, 'did.publicDidDocument.id', '');
    this.props.getProfile(didId);
  }

  handleClick(button) {
    if (button === 'profile') {
      this.setState({activeSubmenu: "profile"})
    }
    else if (button === 'wallet') {
      this.setState({activeSubmenu: "wallet"})
    }
  }

  change = (event, fieldName) => {
    let didId = get(this.props.wallet, 'did.publicDidDocument.id', '')

    this.props.updateProfile(didId, {
      ...this.props.profile,
      [fieldName]: event.target.value
    });
  }

  static propTypes = {
    wallet: object
  }

  handleTabChange = (event, value) => {
    this.setState({ value });
  };

  handleDownload = () => downloadWallet(this.props.wallet)

  render () {
    const { wallet, classes } = this.props
    const { value } = this.state

    return <Card className={classes.card}>
        <CardHeader
            avatar={<Avatar><AccountBoxIcon/></Avatar>}
            subheader='Your Profile and Wallet Settings'
        />

        <Tabs
          value={this.state.value}
          onChange={this.handleTabChange}
          fullWidth
          indicatorColor="secondary"
          textColor="secondary"
          centered
        >
          <Tab icon={<ProfileIcon className={classes.rightIcon}/>} label="My Profile" />
          <Tab icon={<WalletIcon className={classes.rightIcon}/>} label="My Wallet" />
        </Tabs>

        <Divider/>
        <CardContent>
          {value === 0 && <TabContainer>
              {this.renderProfile()}
          </TabContainer>}
          {value === 1 && <TabContainer>
            {this.renderWallet()}
          </TabContainer>}
        </CardContent>
      </Card>
  }

  renderProfile() {
    const { wallet, classes } = this.props
    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={<Avatar><ProfileIcon/></Avatar>}
          title='Profile'
          subheader='Your Profile Page'
        />
        <CardContent>
          {this.renderUser()}
        </CardContent>
      </Card>
    )
  }

  renderWallet() {
    const { wallet, classes } = this.props
    const address = getAddress(wallet)
    const didId = get(wallet, 'did.publicDidDocument.id', '')
    const didPrivateKey = get(wallet, 'did.privateKeyBase58', '')

    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={<Avatar><WalletIcon/></Avatar>}
          title='Wallet'
          subheader='Your Distributed Identity and Bitcoin Funds'
        />
        <CardContent>
          <List dense disablePadding>
            <ReactCopyToClipBoard text={didId}>
              <ListItem button>
                  <ListItemIcon><UserIcon/></ListItemIcon>
                  <ListItemText
                      primary='Distributed Identity (DID)'
                      secondary={`${didId} - Click to copy to clipboard`}
                  />
              </ListItem>
            </ReactCopyToClipBoard>
            <ReactCopyToClipBoard text={didPrivateKey}>
              <ListItem button>
                  <ListItemIcon><KeyIcon/></ListItemIcon>
                  <ListItemText
                      primary='DID Private Key'
                      secondary='Click to copy to clipboard'
                  />
              </ListItem>
            </ReactCopyToClipBoard>
            <ReactCopyToClipBoard text={address}>
              <ListItem button>
                  <ListItemIcon><WalletIcon/></ListItemIcon>
                  <ListItemText
                      primary='Your Bitcoin Address (testnet)'
                      secondary={`${address} - Click to copy to clipboard`}
                  />
              </ListItem>
            </ReactCopyToClipBoard>
          </List>
        </CardContent>
        <CardActions>
          <Button variant='raised' onClick={this.handleDownload}>
            <DownloadIcon/> Download Wallet
          </Button>
        </CardActions>
      </Card>
    )
  }

  renderUser() {
    const { classes, profile } = this.props;

    return (
      <Grid container justify='center' spacing={16}>
        <Grid item xs={12} sm={12} md={12}>
          <PictureUpload />
          <div className={classes.description}>Upload Photo</div>
        </Grid>
        <Grid item xs={12} sm={12} md={5}>
          <CustomInput
            success={this.state.emailState === 'success'}
            error={this.state.emailState === 'error'}
            labelText={
              <span>
                Email <small>(required)</small>
              </span>
            }
            id='email'
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              onChange: event => this.change(event, 'email', 'length', 3),
              value: profile.email || "",
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
            labelText={
              <span>
                User Name <small>(required)</small>
              </span>
            }
            id='username'
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              onChange: event => this.change(event, 'username', 'length', 3),
              value: profile.username || "",
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
            labelText={
              <span>
                First Name <small>(optional)</small>
              </span>
            }
            id='firstname'
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              onChange: event => this.change(event, 'firstname', 'length', 3),
              value: profile.firstname || "",
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
            labelText={
              <span>
                Last Name <small>(optional)</small>
              </span>
            }
            id='lastname'
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              onChange: event => this.change(event, 'lastname', 'length', 3),
              value: profile.lastname || "",
              endAdornment: (
                <InputAdornment position='end' className={classes.inputAdornment}>
                  <Face className={classes.inputAdornmentIcon} />
                </InputAdornment>
              )
            }}
          />
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = store => {
  return {
    wallet: store.data.wallet,
    profile: store.ui.profile.profile || {}
  };
};

// const updateProfileDebounced = debounce(updateProfile, 1000);

const mapDispatchToProps = dispatch => {
  return {
    getProfile: (didId) => {
      fetchProfile(didId)(dispatch);
    },
    updateProfile: (didId, profile) => {
      dispatch(setProfile(profile));
      updateProfile(didId, profile)(dispatch);
    }
  }
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(Settings)
