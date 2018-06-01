import React, { Component } from 'react'
import { shape, bool, func, string, oneOfType, object } from 'prop-types'
// redux
import { connect } from 'react-redux'
import { setWalletSaved, createWallet, resetWallet } from 'store/modules/components/CreateWallet'
import { setWallet } from 'store/modules/data/wallet'
// helpers
import replace from 'helpers/replace'
import { loginDestination } from '../Wallet'
import { downloadWallet } from 'helpers/wallet'
// components
import WalletCard from '../Card'
import Button from '@material-ui/core/Button'
import { toastr } from 'react-redux-toastr'
import { CardContent, CardHeader, Avatar, CardActions } from '@material-ui/core';
// icons
import WalletIcon from '@material-ui/icons/AccountBalanceWallet'
import DownloadIcon from '@material-ui/icons/FileDownload'
import { saveWalletToLocalStorage } from '../../../helpers/wallet';

class CreateWallet extends Component {
  static propTypes = {
    wallet: shape({
        mnemonic: string,
        addresses: string,
        createWallet: shape({
            mnemonic: oneOfType([bool, string]),
            addressess: string
        })
    }),
    setMnemonic: func,
    setCreateMnemonic: func,
    setSaveMnemonic: func,
    setWalletCreated: func,
    mnemonicSaved: bool,
    walletCreated: bool,
    loading: bool
  }

  static contextTypes = {
    blockchainClient: object
  }

  componentWillUnmount () {
    this.props.resetWallet()
  }

  createWallet = () => {
    const { wallet, createWallet } = this.props

    // TODO: allow user to replace existing wallet, restore modal
    // TODO: use redux store to check if wallet is already there

    if (wallet) {
      toastr.error('Wallet already present', 'You cannot create a new wallet until you delete the existing one')
    }

    createWallet()
  }

  moveToTheWallet = () => {
    const { walletSaved, wallet, setWallet } = this.props

    if (!walletSaved) {
      toastr.warning(
        'Please save your wallet',
        'Once you have saved it you will be able to access the wallet'
      )
    } else {
      setWallet(wallet)
      saveWalletToLocalStorage(wallet)
      replace(loginDestination)
    }

  }

  handleDownload = () => {
    downloadWallet(this.props.wallet)
    this.props.setWalletSaved(true)
  }

  render () {
    const { wallet, loading } = this.props

    return <WalletCard>
      <CardHeader
        avatar={<Avatar><WalletIcon/></Avatar>}
        title='Create a new Wallet'
        subheader='Distributed Identity (DID) and Bitcoin Wallet access keys have been created for you'
      />
      <CardContent>
        Please save your identity and wallet keys before continuing.
        <br/>You will be able to import these into another device to access your data.
        <br/><b>If you lose all copies of this file, all your data will be lost</b>
      </CardContent>
      <CardActions>
        <Button variant='raised' onClick={this.handleDownload} disabled={!wallet} >
          <DownloadIcon/> Download
        </Button>
        <Button onClick={wallet ? this.moveToTheWallet : this.createWallet} disabled={loading}>
          {
            wallet
            ? 'Continue'
            : (loading
              ? 'Loading'
              : 'Create Wallet')
          }
        </Button>
      </CardActions>
    </WalletCard>
  }
}

const mapStateToProps = store => ({
  walletSaved: store.components.createWallet.walletSaved,
  loading: store.components.createWallet.loading,
  wallet: store.components.createWallet.walletCreated
})

const mapDispatchToProps = {
    createWallet,
    setWallet,
    setWalletSaved,
    resetWallet
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateWallet)
