import React, { Component } from 'react'
import { shape, bool, func, string, oneOfType, object } from 'prop-types'
// redux
import { connect } from 'react-redux'
import { setMnemonic, setCreateMnemonic } from 'store/modules/data/wallet'
import { setWalletCreated, setSaveMnemonic } from 'store/modules/components/CreateWallet'
// helpers
import replace from 'helpers/replace'
import { loginDestination } from '../Wallet'
// libs
import { CopyToClipboard } from 'react-copy-to-clipboard'
import fileDownload from 'js-file-download'
// components
import WalletCard from '../Card'
import Button from '@material-ui/core/Button'
import { toastr } from 'react-redux-toastr'
import { Grid, CardContent, CardHeader, Avatar, CardActions } from '@material-ui/core';
// icons
import WalletIcon from '@material-ui/icons/AccountBalanceWallet'
import DownloadIcon from '@material-ui/icons/FileDownload'

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
    walletCreated: bool
  }

  static contextTypes = {
    blockchainClient: object
  }

  create () {
  }

  componentWillUnmount () {
    this.props.setWalletCreated(false)
    this.props.setSaveMnemonic(false)
  }

  createWallet = () => {
    const { walletCreated, setWalletCreated, setMnemonic, setCreateMnemonic } = this.props
    const { blockchainClient: { importPrivateKey } } = this.context

    // TODO: allow user to replace existing wallet, restore modal
    // TODO: use redux store to check if wallet is already there

    if (walletCreated) {
      toastr.error('Wallet already present', 'You cannot create a new wallet until you delete the existing one')
    }

    const mnemonic = importPrivateKey.generateNewMnemonic()
    setCreateMnemonic(mnemonic)
    setMnemonic(mnemonic)
    console.log('create wallet with mnemonic: ', mnemonic)
    setWalletCreated(true)
  }

  moveToTheWallet = () => {
    const { mnemonicSaved } = this.props

    if (!mnemonicSaved) {
      toastr.warning(
        'Please save your wallet',
        'Once you have saved it you will be able to access the wallet'
      )
    } else {
      replace(loginDestination)
    }

  }

  handleDownload = bitcoinMnemonic => () => {
    const file = {
      chluWallet: {
        did: {
          id: null,
          privateKeyBase58: null,
        },
        testnet: true,
        bitcoinMnemonic
      }
    }
    fileDownload(JSON.stringify(file, null, 2), 'chlu_wallet.json')
    this.props.setSaveMnemonic(true)
  }

  render () {
    const {
      mnemonicSaved,
      walletCreated,
      wallet: { createWallet: { mnemonic } }
    } = this.props

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
        <Button variant='raised' onClick={this.handleDownload(mnemonic)}>
          <DownloadIcon/> Download
        </Button>
        <Button onClick={walletCreated ? this.moveToTheWallet : this.createWallet}>
          {walletCreated ? 'Continue' : 'Create Wallet'}
        </Button>
      </CardActions>
    </WalletCard>
  }
}

const mapStateToProps = store => ({
  wallet: store.data.wallet,
  mnemonicSaved: store.components.createWallet.mnemonicSaved,
  walletCreated: store.components.createWallet.walletCreated
})

const mapDispatchToProps = {
    setMnemonic,
    setCreateMnemonic,
    setWalletCreated,
    setSaveMnemonic
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateWallet)
