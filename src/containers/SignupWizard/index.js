import React, { Component } from 'react'
import Wizard from 'components/MaterialDashboardPro/Wizard'
import Step1 from './WizardSteps/Step1'
import Step2 from './WizardSteps/Step2'
import Step3 from './WizardSteps/Step3'

// redux
import { connect } from 'react-redux'
import { createWallet, setWalletSaved } from 'store/modules/components/CreateWallet'
import { setAcceptTermsAndConditions } from 'store/modules/components/SignupWizard'
import { readMyReputation } from 'store/modules/data/reputation'
import { signupToMarketplace } from 'store/modules/ui/profile'
import { toastr } from 'react-redux-toastr'
import { push } from 'react-router-redux'
import { submit } from 'redux-form'

// helpers
import { downloadWallet as downloadWalletFile } from 'helpers/wallet'
import { get, pick } from 'lodash'
import { businessTypes } from 'store/modules/ui/profile';
import { startCrawler } from 'store/modules/data/crawler';

class SignupWizard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      signupType: undefined, // "user" or "business"
      profile: {},
      crawlerData: {}
    }
  }

  async downloadWallet() {
    const { wallet, walletCreated, setWalletSaved } = this.props

    if (wallet && wallet.did) {
      console.log('Wallet: redownloading file')
      downloadWalletFile(pick(wallet, ['did', 'bitcoinMnemonic', 'testnet']))
    } else {
      console.log('Wallet: downloading file (not logged in yet)')
      downloadWalletFile(walletCreated)
    }

    setWalletSaved(true)
  }

  areWalletKeysSaved() {
    const { walletSaved } = this.props
    return walletSaved
  }

  validate(step) {
    const { wallet, acceptedTerms } = this.props

    if (step === 0 && !acceptedTerms && !(this.areWalletKeysSaved() || (wallet && wallet.did))) {
      toastr.warning(
        'Terms and Conditions',
        'Please read and accept the Terms and Conditions before continuing'
      )
      return false
    }

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
    const { walletCreated, createWallet } = this.props
    if (to === 1 && !walletCreated) {
      createWallet()
    }
  }

  onSignupTypeChange = (signupType) => {
    this.setState({
      signupType: signupType
    })
  }

  onProfileFieldChange = (fieldName, fieldValue) => {
    console.log("onProfileFieldChange executing for fieldName: "+fieldName+" with fieldValue: "+fieldValue)
    this.setState(state => {
      state.profile[fieldName] = fieldValue
      return state
    })
  }

  onCrawlerFieldChange = (type, url, user, pass) => {
    this.setState(state => {
      if (!state.crawlerData[type]) {
        state.crawlerData[type] = {}
      }

      state.crawlerData[type].url = url
      state.crawlerData[type].user = user
      state.crawlerData[type].pass = pass

      console.log(type)
      console.log(state.crawlerData[type])

      return state
    })
  }

  async finishClicked() {
    const { walletCreated } = this.props
    const { profile, signupType } = this.state

    // Check if signup is in progress
    if (get(walletCreated, 'did.publicDidDocument.id')) {
      const preparedProfile = {
        ...profile,
        signupType,
        businesstype: (profile.businesstype > 0 && businessTypes[profile.businesstype]) || 'Other'
      }

      // We'll request crawler runs in parallel
      // TODO: the server should accept multiple crawlers in one request
      const crawlerPromises = []

      for (const crawlerType of Object.keys(this.state.crawlerData)) {
        const crawlerFields = this.state.crawlerData[crawlerType]
        const crawlerPromise = this.props.startCrawler(crawlerType, crawlerFields.url, crawlerFields.user, crawlerFields.pass)

        crawlerPromises.push(crawlerPromise)
      }

      if (crawlerPromises.length > 0) {
        await Promise.all(crawlerPromises)
      }

      await this.props.signupToMarketplace(preparedProfile)

      toastr.success(
        'Congratulations',
        `You have completed the first airdrop task and earned 1 Chlu bonus token.
        You will be awarded the Chlu token post our public sale`
      )

      if (crawlerPromises.length > 0) {
        toastr.success(
          'Your Reviews',
          'Your reviews from your chosen platforms will be imported shortly. They will be available on the Reputation page once done.'
        )
      }
    } else {
      toastr.success(
        'Already logged in',
        `You have completed the first airdrop task and earned 1 Chlu bonus token.
        You will be awarded the Chlu token post our public sale`
      )
    }
  }

  render() {
    const { wallet } = this.props
    const initialStep = wallet.did ? 1 : 0

    return (
      <Wizard
        validate={this.validate.bind(this)}
        currentStep={initialStep}
        onChangeStep={this.onChangeStep.bind(this)}
        finishButtonClick={this.finishClicked.bind(this)}
        steps={[
          {
            stepName: 'Step 1: Create Your Account',
            stepComponent: Step1,
            stepId: 'get started',
            stepProps: {
              ...this.props,
              onSignupTypeChange: this.onSignupTypeChange,
              onProfileFieldChange: this.onProfileFieldChange
            }
          },
          {
            stepName: this.state.signupType === "business" ? 'Step 2: Import Existing Reviews' : 'Step 2: Become A Trusted Reviewer',
            stepComponent: this.state.signupType === "business" ? Step3 : Step2,
            stepId: 'about',
            stepProps: {
              ...this.props,
              onProfileFieldChange: this.onProfileFieldChange,
              onCrawlerFieldChange: this.onCrawlerFieldChange,
              downloadWallet: this.downloadWallet.bind(this)
            }
          }
        ]}
        title="Let's Get Started"
        subtitle='Follow The Three Easy Steps Below To Begin'
      />
    )
  }
}

const mapStateToProps = store => ({
  loading: store.components.createWallet.loading,
  loginLoading: store.ui.profile.loginLoading,
  walletSaved: store.components.createWallet.walletSaved,
  walletCreated: store.components.createWallet.walletCreated,
  wallet: store.data.wallet,
  acceptedTerms: store.components.signupWizard.acceptedTerms
})

const mapDispatchToProps = {
  createWallet,
  setWalletSaved,
  readMyReputation,
  setAcceptTermsAndConditions,
  startCrawler,
  signupToMarketplace,
  push,
  submit
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupWizard)
