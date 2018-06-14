import React, { Component } from 'react'
import { object } from 'prop-types'
import { get } from 'lodash'
// components
import { Button, Card, CardContent, CardActions, CardHeader } from '@material-ui/core'
import { Avatar, withStyles, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import ConfirmActionModal from 'components/Modals/ConfirmActionModal';
// redux
import { compose } from 'recompose';
import { connect } from 'react-redux'
import { deleteWallet, closeDeleteModal, openDeleteModal } from 'store/modules/data/wallet'
import { push } from 'react-router-redux'
// helpers
import { downloadWallet, getAddress } from 'helpers/wallet';
// icons
import DownloadIcon from '@material-ui/icons/FileDownload'
import DeleteIcon from '@material-ui/icons/Delete'
import UserIcon from '@material-ui/icons/Person'
import WalletIcon from '@material-ui/icons/AccountBalanceWallet'
import ProfileIcon from '@material-ui/icons/AccountBalanceWallet'

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

  deleteWallet = () => {
    this.props.deleteWallet()
    this.props.push('/')
  }

  render () {
    const { wallet, classes, isModalOpen, closeDeleteModal, openDeleteModal } = this.props
    const address = getAddress(wallet)
    const didId = get(wallet, 'did.publicDidDocument.id', '')

    return <Card className={classes.card}>
      <CardHeader
        avatar={<Avatar><ProfileIcon/></Avatar>}
        title='Wallet'
        subheader='Your Distributed Identity and Bitcoin Funds'
      />
      <CardContent>
        <List dense disablePadding>
            <ListItem>
                <ListItemIcon><UserIcon/></ListItemIcon>
                <ListItemText
                    primary='Distributed Identity (DID)'
                    secondary={didId}
                />
            </ListItem>
            <ListItem>
                <ListItemIcon><WalletIcon/></ListItemIcon>
                <ListItemText
                    primary='Bitcoin Wallet (testnet)'
                    secondary={address}
                />
            </ListItem>
        </List>
      </CardContent>
      <CardActions>
        <Button variant='raised' onClick={this.handleDownload}>
          <DownloadIcon/> Download
        </Button>
        <Button variant='raised' color='secondary' onClick={openDeleteModal}>
          <DeleteIcon/> Log Out
        </Button>
      </CardActions>
      <ConfirmActionModal
        isOpen={isModalOpen}
        confirm={this.deleteWallet.bind(this)}
        cancel={closeDeleteModal}
        text='Download the wallet before logging out or you will lose your funds and identity!'
      />
    </Card>
  }
}

const mapStateToProps = store => ({
  wallet: store.data.wallet,
  isModalOpen: store.data.wallet.isDeleteModalOpen
})

const mapDispatchToProps = {
  deleteWallet,
  closeDeleteModal,
  openDeleteModal,
  push
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(cardStyle)
)(Settings)
