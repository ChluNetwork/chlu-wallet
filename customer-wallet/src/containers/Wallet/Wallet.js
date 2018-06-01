
import React, { Component } from 'react'
// libs
import { shape, bool, func, string, oneOfType } from 'prop-types'
// redux
import { connect } from 'react-redux'
import { toggleMnemonicExists } from 'store/modules/ui/modal'
// helpers
import replace from 'helpers/replace'
// components
import { Grid, CardContent } from '@material-ui/core';
import WalletCard from './Card'
import Button from '@material-ui/core/Button'
import MnemonicExistsModal from 'components/Modals/MnemonicExistsModal'
// assets
import chluLogo from 'images/svg/chlu-1.svg'

class LoginPage extends Component {
  static propTypes = {
    wallet: shape({
      mnemonic: string,
      createWallet: shape({ mnemonic: oneOfType([bool, string]) })
    }),
    mnemonicExistsModal: shape({ isOpen: bool }),
    toggleMnemonicExists: func
  }

  onCreateWalletClick = () => {
    const { wallet, toggleMnemonicExists } = this.props

    if (wallet && wallet.did) {
      // TODO: review this
      toggleMnemonicExists()
    } else {
      replace('/setup/create')
    }
  }

  onModalClose = () => {
    this.props.toggleMnemonicExists()
  }

  onModalSubmit = () => {
    this.props.toggleMnemonicExists()
    replace('/setup/create')
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
      <WalletCard>
        <CardContent>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <img src={chluLogo} style={logoStyle} alt='Chlu' />
            </Grid>
            <Grid item xs={12} md={6}>
              <Button fullWidth variant='raised' color='primary' onClick={() => replace('/setup/import')}>
                Import Identity
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button fullWidth variant='raised' color='secondary' onClick={this.onCreateWalletClick}>
                Create new Identity
              </Button>
            </Grid>
          </Grid>
        </CardContent>
        <MnemonicExistsModal
          isOpen={isOpen}
          handleCancel={this.onModalClose}
          handleContinue={this.onModalSubmit}
        />
      </WalletCard>
    )
  }
}

const mapStateToProps = store => ({
  mnemonicExistsModal: store.ui.modal.mnemonicExistsModal,
  wallet: store.data.wallet
})

const mapDispatchToProps = {
  toggleMnemonicExists
}

export const loginDestination = '/claim'

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)