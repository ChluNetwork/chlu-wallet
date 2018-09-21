import React, { Component } from 'react'
import { object } from 'prop-types'
import { get } from 'lodash'

// components
import { Button, Card, CardContent, CardActions, CardHeader, Divider, LinearProgress } from '@material-ui/core'
import { Avatar, withStyles, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import ReactCopyToClipBoard from 'react-copy-to-clipboard'
import ProfileForm from 'containers/Profile/ProfileForm'

// redux
import { compose } from 'recompose';
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { fetchProfile, updateProfile } from 'store/modules/ui/profile';
import { fetchBalance } from 'store/modules/data/wallet';
import { submit, isDirty, isSubmitting } from 'redux-form'

// helpers
import { downloadWallet, getAddress } from 'helpers/wallet';

// icons
import DownloadIcon from '@material-ui/icons/CloudDownload'
import UserIcon from '@material-ui/icons/Person'
import WalletIcon from '@material-ui/icons/AccountBalanceWallet'
import ProfileIcon from '@material-ui/icons/AccountCircle'
import KeyIcon from '@material-ui/icons/Lock'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import SaveIcon from '@material-ui/icons/Save';
import BalanceIcon from '@material-ui/icons/AttachMoney'


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

  async componentDidMount() {
    const didId = get(this.props.wallet, 'did.publicDidDocument.id', '');
    this.props.fetchBalance()
    await this.props.fetchProfile(didId)
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

  handleDownload = () => {
    downloadWallet(this.props.wallet)
  }

  save = async () => {
    return await this.props.submit('profile')
  }

  updateProfile = async profile => {
    return await this.props.updateProfile(profile)
  }

  viewPublicProfile = () => {
    return this.props.push(`/profile/${this.props.didId}`)
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
    const { classes, profile, loading, dirty, submitting } = this.props
    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={<Avatar><ProfileIcon/></Avatar>}
          title='Profile'
          subheader='Your Profile Page'
        />
        <CardContent>
          {loading && <LinearProgress />}
          {!loading && <ProfileForm
            userType={get(profile, 'type')}
            initialValues={profile}
            onSubmit={this.updateProfile}
          />}
        </CardContent>
        <CardActions>
          <Button variant='raised' onClick={this.save} disabled={!dirty || loading || submitting}>
            <SaveIcon/> {loading ? 'Loading...' : (submitting ? 'Saving...' : (dirty ? 'Save Changes' : 'Saved'))}
          </Button>
          <Button onClick={this.viewPublicProfile} disabled={loading}>
            <UserIcon/> View Public Profile
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
}

const mapStateToProps = store => {
  return {
    wallet: store.data.wallet,
    profile: store.ui.profile.profile || {},
    didId: store.ui.profile.didId,
    loading: store.ui.profile.loading,
    dirty: isDirty('profile')(store),
    submitting: isSubmitting('profile')(store),
  };
};

const mapDispatchToProps = {
  updateProfile,
  fetchProfile,
  fetchBalance,
  push,
  submit
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(Settings)
