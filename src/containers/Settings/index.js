import React, { Component } from 'react'
import { object } from 'prop-types'
import { get } from 'lodash'
// components
import { Button, Card, CardContent, CardActions, CardHeader } from '@material-ui/core'
import { Avatar, withStyles, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import ReactCopyToClipBoard from 'react-copy-to-clipboard'
// redux
import { compose } from 'recompose';
import { connect } from 'react-redux'
// helpers
import { downloadWallet, getAddress } from 'helpers/wallet';
// icons
import DownloadIcon from '@material-ui/icons/FileDownload'
import UserIcon from '@material-ui/icons/Person'
import WalletIcon from '@material-ui/icons/AccountBalanceWallet'
import ProfileIcon from '@material-ui/icons/AccountBalanceWallet'
import KeyIcon from '@material-ui/icons/Lock'

const cardStyle = {
  card: {
    margin: '30px'
  }
}

class Settings extends Component {
  static propTypes = {
    wallet: object
  }

  handleDownload = () => downloadWallet(this.props.wallet)

  render () {
    const { wallet, classes } = this.props
    const address = getAddress(wallet)
    const didId = get(wallet, 'did.publicDidDocument.id', '')
    const didPrivateKey = get(wallet, 'did.privateKeyBase58', '')

    return <Card className={classes.card}>
      <CardHeader
        avatar={<Avatar><ProfileIcon/></Avatar>}
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
                    primary='Bitcoin Wallet (testnet)'
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
  }
}

const mapStateToProps = store => ({
  wallet: store.data.wallet
})

export default compose(
  connect(mapStateToProps),
  withStyles(cardStyle)
)(Settings)
