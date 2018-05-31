import React, { Component } from 'react'
import { func, shape, bool, oneOfType, object } from 'prop-types'
// redux
import { connect } from 'react-redux'
import { toggleMnemonicExists } from 'store/modules/ui/modal'
import { setWallet } from 'store/modules/data/wallet'
// helpers
import get from 'lodash/get'
import replace from 'helpers/replace'
import { loginDestination } from '../Wallet'
// libs
import { submit } from 'redux-form'
import { importWallet } from 'helpers/wallet'
// components
import WalletCard from '../Card'
import Button from '@material-ui/core/Button'
import { toastr } from 'react-redux-toastr'
import ImportWalletForm from './ImportWalletForm'
import MnemonicExistsModal from 'components/Modals/MnemonicExistsModal'
import { CardContent, CardActions, CardHeader, Avatar, Divider } from '@material-ui/core';
// icons
import WalletIcon from '@material-ui/icons/AccountBalanceWallet'
import RestoreIcon from '@material-ui/icons/SettingsBackupRestore'

class ImportWallet extends Component {
  static propTypes = {
    wallet: object,
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

  importWallet = str => {
    try {
      const wallet = importWallet(str)
      this.props.setWallet(wallet)
      toastr.success('Wallet imported', 'Your existing data has been imported')
      replace(loginDestination)
    } catch (error) {
      toastr.error('Could not import Wallet', 'Something went wrong')
      console.log(error)
    }
  }

  onImportCancel = () => {
    this.props.toggleMnemonicExists()
    replace(loginDestination)
  }

  onImportContinue = () => {
    const { toggleMnemonicExists, mnemonicExistsModal } = this.props
    this.importFromMnemonic(get(mnemonicExistsModal, 'data.newMnemonic'))
    toggleMnemonicExists()
  }

  render () {
    const { mnemonicExistsModal: { isOpen } } = this.props

    return (
      <div>
        <WalletCard>
          <CardHeader
            avatar={<Avatar><WalletIcon/></Avatar>}
            title='Import an existing Wallet'
            subheader='Access your existing funds from this device'
          />
          <CardContent>
            <ImportWalletForm onSubmit={this.handleSubmit} />
          </CardContent>
          <CardActions>
            <Button variant='raised' color='primary' onClick={this.onFormSubmit}>
              Import wallet
            </Button>
          </CardActions>
          <Divider/>
        </WalletCard>
        <WalletCard>
          <CardHeader
            avatar={<Avatar><RestoreIcon/></Avatar>}
            title='Import an existing Distributed Identity (DID)'
            subheader='Access your Chlu reputation and reviews from this device'
          />
          <CardActions>
            <Button variant='raised' color='secondary'>
              Import identity 
            </Button>
          </CardActions>
        </WalletCard>
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
  setWallet
}

export default connect(mapStateToProps, mapDispatchToProps)(ImportWallet)
