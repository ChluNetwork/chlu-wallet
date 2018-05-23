
import React, { Component } from 'react'
// libs
import { shape, bool, func, string, oneOfType } from 'prop-types'
import { Link } from 'react-router-dom'
// redux
import { connect } from 'react-redux'
import { toggleMnemonicExists } from 'store/modules/ui/modal'
import { updateMnemonic } from 'store/modules/data/wallet'
// helpers
import replace from 'helpers/replace'
// components
import WalletPaper from './Paper'
import Button from '@material-ui/core/Button'
import MnemonicExistsModal from 'components/Modals/MnemonicExistsModal'
// assets
import chluLogo from 'images/svg/chlu-1.svg'
import { Grid } from '@material-ui/core';

class LoginPage extends Component {
  static propTypes = {
    wallet: shape({
      mnemonic: string,
      createWallet: shape({ mnemonic: oneOfType([bool, string]) })
    }),
    mnemonicExistsModal: shape({ isOpen: bool }),
    toggleMnemonicExists: func,
    updateMnemonic: func
  }

  componentDidMount () {
    if (localStorage.getItem('mnemonic_key')) {
      replace(loginDestination)
    }
    this.props.updateMnemonic()
  }

  onCreateWalletClick = () => {
    const { wallet: { mnemonic }, toggleMnemonicExists } = this.props

    if (mnemonic) {
      toggleMnemonicExists()
    } else {
      replace('/wallet/create')
    }
  }

  onModalClose = () => {
    this.props.toggleMnemonicExists()
  }

  onModalSubmit = () => {
    this.props.toggleMnemonicExists()
    replace('/wallet/create')
  }

  render () {
    const {
      mnemonicExistsModal: { isOpen }
    } = this.props

    const logoStyle = {
      display: 'block',
      margin: 'auto',
      maxWidth: '300px'
    }

    return (
      <WalletPaper>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <img src={chluLogo} style={logoStyle} alt='Chlu' />
          </Grid>
          <Grid item xs={12} md={6}>
            <Link to='wallet/import'>
              <Button fullWidth variant='raised' color='primary'>Import Distributed Identity</Button>
            </Link>
          </Grid>
          <Grid item xs={12} md={6}>
            <Button fullWidth variant='raised' color='secondary' onClick={this.onCreateWalletClick}>
              Create new Identity
            </Button>
          </Grid>
        </Grid>
        <MnemonicExistsModal
          isOpen={isOpen}
          handleCancel={this.onModalClose}
          handleContinue={this.onModalSubmit}
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
  toggleMnemonicExists,
  updateMnemonic
}

export const loginDestination = '/claim'

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)