import React, { Component } from 'react'
import { shape, bool, func, string, oneOfType, object } from 'prop-types'
// redux
import { connect } from 'react-redux'
import { setMnemonic, setCreateMnemonic } from 'store/modules/data/wallet'
import { setWalletCreated, setSaveMnemonic } from 'store/modules/components/CreateWallet'
// helpers
import replace from 'helpers/replace'
// libs
import { CopyToClipboard } from 'react-copy-to-clipboard'
import fileDownload from 'js-file-download'
// components
import WalletPaper from '../Paper'
import Button from '@material-ui/core/Button'
import { toastr } from 'react-redux-toastr'
import { Grid } from '@material-ui/core';

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

  componentDidMount () {
    const { blockchainClient: { importPrivateKey } } = this.context
    const newMnemonic = importPrivateKey.generateNewMnemonic()
    this.props.setCreateMnemonic(newMnemonic)
    this.props.setMnemonic(newMnemonic)
  }

  componentWillUnmount () {
    this.props.setWalletCreated(false)
    this.props.setSaveMnemonic(false)
  }

  createWallet = () => {
    const { wallet: { createWallet: { mnemonic } }, setMnemonic, mnemonicSaved } = this.props

    if (!mnemonicSaved) {
      toastr.warning(
        'warning',
        'Please save your mnemonic. Once you have saved it you will be able to access the wallet'
      )
    }

    setMnemonic(mnemonic)
    console.log('create wallet with mnemonic: ', mnemonic)
    this.props.setWalletCreated(true)
  }

  moveToTheWallet = () => {
    replace('/customer')
  }

  handleCopy = (data) => {
    if (data) {
      toastr.success('success', 'Copying success')
      this.props.setSaveMnemonic(true)
    } else {
      toastr.error('failed', 'Copying failed')
    }
  }

  handleDownload = (mnemonic) => () => {
    this.props.setSaveMnemonic(true)
    fileDownload(mnemonic, 'mnemonic_key.txt')
  }

  render () {
    const {
      mnemonicSaved,
      walletCreated,
      wallet: { createWallet: { mnemonic } }
    } = this.props

    return <WalletPaper>
      <Grid container spacing={24}>
        <Grid item xs={12}>{mnemonic}</Grid>
        <Grid item xs={12} md={6}>
          <Button fullWidth variant='raised' color='primary' onClick={this.handleDownload(mnemonic)}>
            Download Mnemonic
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <CopyToClipboard text={mnemonic} onCopy={this.handleCopy}>
            <Button fullWidth variant='raised' color='secondary'>
              Copy Mnemonic
            </Button>
          </CopyToClipboard>
        </Grid>
        <Grid item xs={12}>
          {(mnemonicSaved && walletCreated)
            ? <Button
              label='Go to wallet'
              fullWidth
              onClick={this.moveToTheWallet}
            >Go to wallet</Button>
            : <Button
              fullWidth
              onClick={this.createWallet}
            >Create wallet</Button>}
        </Grid>
      </Grid>
    </WalletPaper>
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
