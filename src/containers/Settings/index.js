import React, { Component } from 'react'
import { object } from 'prop-types'
import { get } from 'lodash'

// components
import { Button, Card, CardContent, CardActions, CardHeader, Divider, Grid, InputAdornment } from '@material-ui/core'
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import { Avatar, withStyles, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import CustomInput from 'components/MaterialDashboardPro/CustomInput';
import ProfileImageUpload from 'containers/ProfileImageUpload'
import ReactCopyToClipBoard from 'react-copy-to-clipboard'
import BusinessLocationField from 'containers/Profile/BusinessLocationField';

// redux
import { compose } from 'recompose';
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { fetchProfile, updateProfile, businessTypes } from 'store/modules/ui/profile';
import { fetchBalance } from 'store/modules/data/wallet';

// helpers
import { downloadWallet, getAddress } from 'helpers/wallet';

// icons
import Email from '@material-ui/icons/Email';
import Face from '@material-ui/icons/Face';
import DownloadIcon from '@material-ui/icons/FileDownload'
import UserIcon from '@material-ui/icons/Person'
import WalletIcon from '@material-ui/icons/AccountBalanceWallet'
import ProfileIcon from '@material-ui/icons/AccountCircle'
import KeyIcon from '@material-ui/icons/Lock'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import SaveIcon from '@material-ui/icons/Save';
import BalanceIcon from '@material-ui/icons/AttachMoney'
import Phone from '@material-ui/icons/Phone'
import Web from '@material-ui/icons/Web'


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
    <Typography component='div' style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {},
      dirty: false,
      loading: false
    };
  }

  async componentDidMount() {
    const didId = get(this.props.wallet, 'did.publicDidDocument.id', '');
    this.setState({ loading: true })
    this.props.fetchBalance()
    const profile = await this.props.fetchProfile(didId)
    this.setState({
      profile,
      dirty: false,
      loading: false
    })
  }

  static propTypes = {
    wallet: object
  }

  handleTabChange = (event, value) => {
    const urls = [
      '/settings/profile',
      '/settings/wallet'
    ]
    if (urls[value]) {
      this.props.push(urls[value])
    }
  };

  handleDownload () {
    downloadWallet(this.props.wallet)
  }

  async saveProfile () {
    await this.props.updateProfile(this.state.profile)
  }

  change(event, stateName) {
    const value = get(event, 'target.value', event)
    console.log(stateName, value)
    this.setState({ dirty: true, profile: { ...this.state.profile, [stateName]: value } });
  }

  render () {
    const { classes, tabIndex } = this.props

    return <Card className={classes.card}>
      <CardHeader
        avatar={<Avatar><AccountBoxIcon/></Avatar>}
        subheader='Your Profile and Wallet Settings'
      />

      <Tabs
        value={tabIndex}
        onChange={this.handleTabChange}
        fullWidth
        indicatorColor='secondary'
        textColor='secondary'
        centered
      >
        <Tab icon={<ProfileIcon className={classes.rightIcon}/>} label='My Profile' />
        <Tab icon={<WalletIcon className={classes.rightIcon}/>} label='My Wallet' />
      </Tabs>

      <Divider/>
      <CardContent>
        {tabIndex === 0 && <TabContainer>
          {this.renderProfile()}
        </TabContainer>}
        {tabIndex === 1 && <TabContainer>
          {this.renderWallet()}
        </TabContainer>}
      </CardContent>
    </Card>
  }

  renderProfile() {
    const { classes } = this.props
    const { dirty, profile } = this.state
    const isBusiness = get(profile, 'type') === 'business'
    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={<Avatar><ProfileIcon/></Avatar>}
          title='Profile'
          subheader='Your Profile Page'
        />
        <CardContent>
          {isBusiness ? this.renderBusiness() : this.renderUser()}
        </CardContent>
        <CardActions>
          <Button variant='raised' onClick={this.saveProfile.bind(this)} disabled={!dirty}>
            <SaveIcon/> Save
          </Button>
        </CardActions>
      </Card>
    )
  }

  renderWallet() {
    const { wallet, classes } = this.props
    const address = getAddress(wallet)
    const didId = get(wallet, 'did.publicDidDocument.id', '')
    const didPrivateKey = get(wallet, 'did.privateKeyBase58', '')
    const balanceSat = get(wallet, 'balance.final_balance', 0)
    const balance = balanceSat / 100000 // mbtc

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
            <ListItem>
              <ListItemIcon><BalanceIcon/></ListItemIcon>
              <ListItemText
                primary='Wallet Balance'
                secondary={`${balance} mBTC (testnet)`}
              />
            </ListItem>
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
    const { classes } = this.props;
    const { profile } = this.state

    return (
      <Grid container justify='center' spacing={16}>
        <Grid item xs={12} sm={12} md={12}>
          <ProfileImageUpload />
        </Grid>
        <Grid item xs={12} sm={12} md={5}>
          <CustomInput
            success={this.state.emailState === 'success'}
            error={this.state.emailState === 'error'}
            labelText={
              <span>
                Email
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
                User Name
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
                First Name
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
                Last Name
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

  renderBusiness() {
    const { classes } = this.props;
    const { profile } = this.state
    console.log(profile)

    return (
      <Grid container justify='center' spacing={16}>
        <Grid item xs={12} sm={12} md={12}>
          <ProfileImageUpload />
        </Grid>

        <Grid item xs={12} sm={12} md={5}>
          <CustomInput
            success={this.state.businessnameState === 'success'}
            error={this.state.businessnameState === 'error'}
            labelText={<span>Business Name</span>}
            id='businessname'
            formControlProps={{ fullWidth: true }}
            inputProps={{
              onChange: event => this.change(event.target.value, 'businessname', 'length', 3),
              value: profile.businessname || '',
              endAdornment: (
                <InputAdornment position='end' className={classes.inputAdornment}>
                  <Face className={classes.inputAdornmentIcon} />
                </InputAdornment>
              )
            }}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={5}>
          <FormControl fullWidth className={classes.selectFormControl}>
            <InputLabel htmlFor='simple-select' className={classes.selectLabel}>
              Business Type
            </InputLabel>

            <Select
              MenuProps={{ className: classes.selectMenu }}
              classes={{ select: classes.select }}
              value={businessTypes.indexOf(profile.businesstype)}
              onChange={this.handleSimple}
              inputProps={{
                onChange: event => this.change(businessTypes[event.target.value], 'businesstype'),
                name: "simpleSelect",
                id: "simple-select"
              }}
            >
              {businessTypes.map((v, i) => (
                <MenuItem key={i} value={i} disabled={!i} classes={{ root: classes.selectMenuItem, selected: i ? classes.selectMenuItemSelected : undefined }}>{v}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={12} md={3}>
          <CustomInput
            labelText={<span>Email</span>}
            id='email'
            formControlProps={{ fullWidth: true }}
            inputProps={{
              value: profile.email || '',
              onChange: event => this.change(event.target.value, 'email', 'length', 3),
              endAdornment: (
                <InputAdornment position='end' className={classes.inputAdornment}>
                  <Email className={classes.inputAdornmentIcon} />
                </InputAdornment>
              )
            }}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={4}>
          <CustomInput
            labelText={<span>Website</span>}
            id='website'
            formControlProps={{ fullWidth: true }}
            inputProps={{
              onChange: event => this.change(event.target.value, 'website', 'length', 3),
              value: profile.website || '',
              endAdornment: (
                <InputAdornment position='end' className={classes.inputAdornment}>
                  <Web className={classes.inputAdornmentIcon} />
                </InputAdornment>
              )
            }}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={3}>
          <CustomInput
            labelText={<span>Phone</span>}
            id='phone'
            formControlProps={{ fullWidth: true }}
            inputProps={{
              onChange: event => this.change(event.target.value, 'phone', 'length', 3),
              value: profile.phone || '',
              endAdornment: (
                <InputAdornment position='end' className={classes.inputAdornment}>
                  <Phone className={classes.inputAdornmentIcon} />
                </InputAdornment>
              )
            }}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={10}>
          <CustomInput
            labelText='A brief description of your business.'
            id='about-me'
            formControlProps={{ fullWidth: true }}
            inputProps={{
              onChange: event => this.change(event.target.value, 'businessdescription'),
              value: profile.businessdescription || '',
            }}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={10}>
          <BusinessLocationField
            value={profile.businesslocation}
            onChange={value => this.change(value, 'businesslocation')}
            classes={classes}
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

const mapDispatchToProps = {
  updateProfile,
  fetchProfile,
  fetchBalance,
  push
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(Settings)
