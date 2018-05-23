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
import WalletPaper from '../Paper'
import Button from '@material-ui/core/Button'
import { toastr } from 'react-redux-toastr'
import ImportWalletForm from './ImportWalletForm'
import MnemonicExistsModal from 'components/Modals/MnemonicExistsModal'

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
    const { wallet: { mnemonic }, toggleMnemonicExists } = this.props

    if (mnemonic) {
      toggleMnemonicExists({ newMnemonic: newMnemonic })
    } else {
      this.importFromMnemonic(newMnemonic)
    }
  }

  importFromMnemonic = (newMnemonic) => {
    const { blockchainClient: { importPrivateKey } } = this.context
    const keyPath = "m/44'/1'/0'/0/0"
    const importFromMnemonic = importPrivateKey.importFromMnemonic(newMnemonic, keyPath)
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
      <WalletPaper>
        <ImportWalletForm onSubmit={this.handleSubmit} />
        <Button variant='raised' color='primary' fullWidth onClick={this.onFormSubmit}>
          Import wallet
        </Button>
        <MnemonicExistsModal
          isOpen={isOpen}
          handleCancel={this.onImportCancel}
          handleContinue={this.onImportContinue}
        />
      </WalletPaper>
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
