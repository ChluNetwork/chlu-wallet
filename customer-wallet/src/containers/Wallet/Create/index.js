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
import RaisedButton from 'material-ui/RaisedButton'
import { toastr } from 'react-redux-toastr'
// styles
import { buttonStyle } from 'styles/inlineStyles/containers/Wallet/Create'
import './style.css'

class CreateWallet extends Component {
  static propTypes = {
    wallet: shape({
      mnemonic: string,
      createWallet: shape({ mnemonic: oneOfType([bool, string]) })
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

    return (
      <div className='page-container create'>
        <div className='container create-header color-light font-weight-bold'>Create Wallet</div>
        <div className='section-content container-border-top container-border-bottom color-main'>
          <div className='container title'>Save your mnemonic</div>
          <div className='container mnemonic'>{mnemonic}</div>
          <div className='buttons'>
            <RaisedButton
              {...buttonStyle}
              label='Download mnemonic'
              onClick={this.handleDownload(mnemonic)}
            />
            <CopyToClipboard text={mnemonic} onCopy={this.handleCopy}>
              <RaisedButton
                {...buttonStyle}
                label='Copy mnemonic'
              />
            </CopyToClipboard>
          </div>
        </div>
        <div className='container create-footer'>
          {(mnemonicSaved && walletCreated)
            ? <RaisedButton
              label='Go to wallet'
              fullWidth
              onClick={this.moveToTheWallet}
            />
            : <RaisedButton
              label='Create wallet'
              fullWidth
              onClick={this.createWallet}
            />}
        </div>
      </div>
    )
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
