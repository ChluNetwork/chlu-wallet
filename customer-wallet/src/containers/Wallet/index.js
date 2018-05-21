import React, { Component } from 'react'
// libs
import { shape, bool, func, string, oneOfType } from 'prop-types'
import { Link } from 'react-router'
// redux
import { connect } from 'react-redux'
import { toggleMnemonicExists } from 'store/modules/ui/modal'
import { updateMnemonic } from 'store/modules/data/wallet'
// helpers
import replace from 'helpers/replace'
// components
import Button from '@material-ui/core/Button'
import MnemonicExistsModal from 'components/Modals/MnemonicExistsModal'
// styles
import './style.css'
import { buttonStyle } from 'styles/inlineStyles/containers/Wallet'
// assets
import chluLogo from 'images/svg/chlu-1.svg'

class UnAutorized extends Component {
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

    return (
      <div className="page-container wallet">
        <div className='container wallet-header'>
          <img src={chluLogo} className='logo' alt='Chlu' /> Your Decentralized Reputation Wallet
        </div>
        <div className='section-content container-border-top container-border-bottom'>
          <div className='container'>
            <div className='title color-main'>Earn rewards for sending and receiving payments</div>
            <div className='buttons'>
              <Link to='wallet/import'>
                <Button {...buttonStyle} label='Import wallet' />
              </Link>
              <Button {...buttonStyle} label='Create new wallet' onClick={this.onCreateWalletClick} />
            </div>
          </div>
        </div>
        <MnemonicExistsModal
          isOpen={isOpen}
          handleCancel={this.onModalClose}
          handleContinue={this.onModalSubmit}
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
  updateMnemonic
}

export default connect(mapStateToProps, mapDispatchToProps)(UnAutorized)
