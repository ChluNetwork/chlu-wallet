import React, { Component } from 'react'
import Wizard from 'components/MaterialDashboardPro/Wizard'
import Step1 from './WizardSteps/Step1'
import Step2 from './WizardSteps/Step2'
import Step3 from './WizardSteps/Step3'
// redux
import { connect } from 'react-redux'
import { createWallet, setWalletSaved } from 'store/modules/components/CreateWallet'
import { readMyReputation } from 'store/modules/data/reputation'
import { setWallet } from 'store/modules/data/wallet'
import { toastr } from 'react-redux-toastr'
import { push } from 'react-router-redux'
import { submit } from 'redux-form'
// helpers
import { downloadWallet as downloadWalletFile } from 'helpers/wallet'
import { get, pick } from 'lodash'

class SignupWizard extends Component {

  componentDidMount() {
    this.refreshReputation()
  }

  componentWillReceiveProps(newProps) {
    const newDidID = get(newProps, 'wallet.did.didDocument.id', null)
    const oldDidID = get(this.props, 'wallet.did.didDocument.id', null)
    if (newDidID !== oldDidID) {
      this.refreshReputation()
    }
  }

  refreshReputation() {
    if (!this.props.reputationLoading) this.props.readMyReputation()
  }

  downloadWallet() {
    const { wallet, walletCreated, setWalletSaved } = this.props
    if (wallet && wallet.did) {
      downloadWalletFile(pick(wallet, ['did', 'bitcoinMnemonic', 'testnet']))
    } else {
      downloadWalletFile(walletCreated)
    }
    setWalletSaved(true)
  }

  areWalletKeysSaved() {
    const { walletSaved } = this.props
    return walletSaved
  }

  validate(step) {
    const { wallet, crawlerRunning } = this.props
    if (crawlerRunning) return false
    if (step === 1 && !(this.areWalletKeysSaved() || (wallet && wallet.did))) {
      toastr.warning(
        'Please save your Wallet Keys',
        'Once you have saved the file you will be able to continue'
      )
      return false
    }
    return true
  }

  onChangeStep(from, to) {
    const { walletCreated, createWallet, setWallet, wallet } = this.props
    if (to === 1 && !walletCreated) createWallet()
  }

  finishClicked() {
    if (Array.isArray(get(this.props.reputation, 'reviews', null))) {
      // Reputation is there
      this.props.push('/reputation')
    } else {
      this.props.submit('individualsCrawlerForm')
    }
  }

  render() {
    const { wallet, crawlerRunning } = this.props
    const initialStep = wallet.did ? 2 : 0

    return <Wizard
      validate={this.validate.bind(this)}
      currentStep={initialStep}
      onChangeStep={this.onChangeStep.bind(this)}
      finishButtonClick={this.finishClicked.bind(this)}
      nextButtonDisabled={crawlerRunning}
      previousButtonDisabled={crawlerRunning}
        
      steps={[
        {
          stepName: '1: Create Your Wallet',
          stepComponent: Step1,
          stepId: 'get started',
          stepProps: {
            ...this.props
          }
        },
        {
          stepName: '2: Save Your D.I.D.',
          stepComponent: Step2,
          stepId: 'about',
          stepProps: {
            ...this.props,
            downloadWallet: this.downloadWallet.bind(this)
          }
        },
        {
          stepName: '3: Claim Your Reputation',
          stepComponent: Step3,
          stepId: 'reviews',
          stepProps: {
            ...this.props
          }
        },
      ]}
      title="Let's Get Started"
      subtitle='Follow The Three Easy Steps Below To Begin'
    />
  }
}

const mapStateToProps = store => ({
  loading: store.components.createWallet.loading,
  walletSaved: store.components.createWallet.walletSaved,
  walletCreated: store.components.createWallet.walletCreated,
  wallet: store.data.wallet,
  reputation: store.data.reputation.reputation,
  reputationLoading: store.data.reputation.loading,
  crawlerRunning: store.data.crawler.running
})

const mapDispatchToProps = {
  createWallet,
  setWallet,
  setWalletSaved,
  readMyReputation,
  push,
  submit
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupWizard)
