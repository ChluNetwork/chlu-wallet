import React, { Component } from 'react'
import { shape, bool, func, string, oneOfType, object } from 'prop-types'
// redux
import { connect } from 'react-redux'
import { toggleMnemonicExists } from 'store/modules/ui/modal'
import { setMnemonic, setCreateMnemonic } from 'store/modules/data/wallet'
// helpers
import replace from 'helpers/replace'
// libs
import { CopyToClipboard } from 'react-copy-to-clipboard'
import fileDownload from 'js-file-download'
// components
import RaisedButton from 'material-ui/RaisedButton'
import { toastr } from 'react-redux-toastr'
import MnemonicExistsModal from 'components/Modals/MnemonicExistsModal'
// styles
import './style.css'
import { buttonStyle } from 'styles/inlineStyles/containers/Wallet/Create'

class CreateWallet extends Component {
  static propTypes = {
    wallet: shape({
      mnemonic: string,
      createWallet: shape({ mnemonic: oneOfType([bool, string]) })
    }),
    mnemonicExistsModal: shape({ isOpen: bool }),
    toggleMnemonicExists: func,
    setMnemonic: func,
    setCreateMnemonic: func
  }

  static contextTypes = {
    blockchainClient: object
  }

  componentDidMount () {
    const { blockchainClient: { importPrivateKey } } = this.context
    const newMnemonic = importPrivateKey.generateNewMnemonic()

    this.props.setCreateMnemonic(newMnemonic)
  }

  onImportCancel = () => {
    this.props.toggleMnemonicExists()
    replace('/customer')
  }

  onImportContinue = () => {
    this.createWallet()
    this.props.toggleMnemonicExists()
  }

  onCreateWalletClick = () => {
    const { wallet: { mnemonic }, toggleMnemonicExists } = this.props

    if (mnemonic) {
      toggleMnemonicExists()
    } else {
      this.createWallet()
    }
  }

  createWallet = () => {
    const { wallet: { createWallet: { mnemonic } }, setMnemonic } = this.props

    console.log('create wallet with mnemonic: ', mnemonic)
    toastr.success('success', 'Create wallet success')
    setMnemonic(mnemonic)
    replace('/customer')
  }

  handleCopy = (data) => data ? toastr.success('success', 'Copying success') : toastr.error('failed', 'Copying failed')
  handleDownload = (mnemonic) => () => fileDownload(mnemonic, 'mnemonic_key.txt')

  render () {
    const {
      mnemonicExistsModal: { isOpen },
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
              label='Save mnemonic'
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
          <RaisedButton
            label='Create wallet'
            fullWidth
            onClick={this.onCreateWalletClick}
          />
        </div>
        <MnemonicExistsModal
          isOpen={isOpen}
          handleCancel={this.onImportCancel}
          handleContinue={this.onImportContinue}
        />
      </div>
    )
  }
}

const mapStateToProps = store => ({
  mnemonicExistsModal: store.ui.modal.mnemonicExistsModal,
  wallet: store.data.wallet
})

const mapDispatchToProps = {
  toggleMnemonicExists,
  setMnemonic,
  setCreateMnemonic
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateWallet)
