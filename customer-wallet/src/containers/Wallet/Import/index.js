import React, { Component } from 'react'
import { func, shape, bool, string, oneOfType, object } from 'prop-types'
// redux
import { connect } from 'react-redux'
import { toggleMnemonicExists } from 'store/modules/ui/modal'
import { setMnemonic } from 'store/modules/data/wallet'
// helpers
import get from 'lodash/get'
import replace from 'helpers/replace'
// libs
import { submit } from 'redux-form'
// components
import RaisedButton from 'material-ui/RaisedButton'
import { toastr } from 'react-redux-toastr'
import ImportWalletForm from './ImportWalletForm'
import MnemonicExistsModal from 'components/Modals/MnemonicExistsModal'
// styles
import './style.css'
import { buttonStyle } from 'styles/inlineStyles/containers/Wallet/Import'

class ImportWallet extends Component {
  static propTypes = {
    wallet: shape({ mnemonic: string }),
    mnemonicExistsModal: shape({
      isOpen: bool,
      data: oneOfType([bool, object])
    }),
    toggleMnemonicExists: func,
    setMnemonic: func,
    submit: func
  }

  static contextTypes = {
    blockchainClient: object
  }

  onFormSubmit = () => this.props.submit('import-wallet-form')

  handleSubmit = ({ mnemonic: newMnemonic }) => {
    const { wallet: { mnemonic }, toggleMnemonicExists} = this.props

    if (mnemonic) {
      toggleMnemonicExists({ newMnemonic: newMnemonic })
    } else {
      this.importFromMnemonic(newMnemonic)
    }
  }

  importFromMnemonic = (newMnemonic) => {
    const { blockchainClient: { importPrivateKey } } = this.context
    const importFromMnemonic = importPrivateKey.importFromMnemonic(newMnemonic, 'm/1')
    this.props.setMnemonic(newMnemonic)

    if (importFromMnemonic) {
      toastr.success('success', 'Import mnemonic success')
      console.log('importFromMnemonic__', importFromMnemonic)
      replace('/customer')
    } else {
      toastr.error('failed', 'Import mnemonic failed')
    }
  }

  onImportCancel = () => {
    this.props.toggleMnemonicExists()
    replace('/customer')
  }

  onImportContinue = () => {
    const { toggleMnemonicExists, mnemonicExistsModal } = this.props
    this.importFromMnemonic(get(mnemonicExistsModal, 'data.newMnemonic'))
    toggleMnemonicExists()
  }

  render () {
    const { mnemonicExistsModal: { isOpen } } = this.props

    return (
      <div className='page-container import'>
        <div className='container import-header color-light font-weight-bold'>Import Wallet</div>
        <div className='section-content'>
          <div className='container'>
            <div className='title color-main'>Enter your mnemonic to import your BTC wallet</div>
            <ImportWalletForm onSubmit={this.handleSubmit} />
            <div className='button'>
              <RaisedButton
                {...buttonStyle}
                fullWidth
                label='Import wallet'
                className='submit-button'
                onClick={this.onFormSubmit}
              />
            </div>
          </div>
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
  submit,
  toggleMnemonicExists,
  setMnemonic
}

export default connect(mapStateToProps, mapDispatchToProps)(ImportWallet)
