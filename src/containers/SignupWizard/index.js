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
import { setWallet, setWalletToCreatedWallet } from 'store/modules/data/wallet'
import { toastr } from 'react-redux-toastr'
import { push } from 'react-router-redux'
import { submit } from 'redux-form'

// helpers
import { downloadWallet as downloadWalletFile } from 'helpers/wallet'
import { get, pick, isEmpty } from 'lodash'
import { geocode } from 'helpers/geocode';
import profileProvider from 'helpers/profileProvider';

class SignupWizard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      signupType: undefined, // "user" or "business"
      profile: {}
    };
  }

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

  async downloadWallet() {
    console.log('downloadWallet executing SignupWizard index.js file.');
    const { wallet, walletCreated, setWalletSaved } = this.props

    if (wallet && wallet.did) {
      downloadWalletFile(pick(wallet, ['did', 'bitcoinMnemonic', 'testnet']))
    } else {
      let profile = { ...this.state.profile };

      if (profile.businesslocation) {
        // Pre-cache geo coords for location.
        // TODO: perhaps this could be done on the marketplace server, to ensure coords line up with the location text.
        try {
          let coords = await geocode(profile.businesslocation);

          if (coords) {
            profile = {
              ...profile,
              businesslocationgeo: {
                latitude: coords.latitude,
                longitude: coords.longitude,
                bounds: coords.bounds
              }
            }
          }
        } catch (err) {
          // Let's not break up the signup flow with API errors.
          console.error(err);
        }
      }

      profileProvider.setProfile(walletCreated.did.publicDidDocument.id, {
        ...profile,
        'AIRDROP_LEVEL': 'ZERO'
      });

      downloadWalletFile(walletCreated)
    }

    setWalletSaved(true)
  }

  areWalletKeysSaved() {
    const { walletSaved } = this.props
    return walletSaved
  }

  validate(step) {
    const { wallet, crawlerRunning, acceptedTerms } = this.props
    if (crawlerRunning) return false
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
    });
  }

  onProfileFieldChange = (fieldName, fieldValue) => {
    console.log("onProfileFieldChange executing for fieldName: "+fieldName+" with fieldValue: "+fieldValue)
    this.setState(state => {
      state.profile[fieldName] = fieldValue;
      return state;
    });
  }

  finishClicked() {
    const { walletCreated } = this.props

    // Check if signup is in progress
    if (get(walletCreated, 'did.publicDidDocument.id')) {
      this.props.setWalletToCreatedWallet() // logs in user
      // update user vendor profile on marketplace
      const isBusiness = this.state.signupType === "business"
      profileProvider.updateProfile(walletCreated.did.publicDidDocument.id, {
        'type': isBusiness ? 'business' : 'individual'
      });
    }

    toastr.success(
      'Congratulations',
      'You have completed the first airdrop task and earned 1 Chlu bonus token. You will be awarded the Chlu token post our public sale'
    )
  }

  render() {
    const { wallet, crawlerRunning } = this.props
    const initialStep = wallet.did ? 1 : 0

    return (
      <Wizard
        validate={this.validate.bind(this)}
        currentStep={initialStep}
        onChangeStep={this.onChangeStep.bind(this)}
        finishButtonClick={this.finishClicked.bind(this)}
        nextButtonDisabled={crawlerRunning}
        previousButtonDisabled={crawlerRunning}
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
  walletSaved: store.components.createWallet.walletSaved,
  walletCreated: store.components.createWallet.walletCreated,
  wallet: store.data.wallet,
  reviews: store.data.reputation.reviews,
  reputationLoading: store.data.reputation.loading,
  crawlerRunning: store.data.crawler.running,
  acceptedTerms: store.components.signupWizard.acceptedTerms
})

const mapDispatchToProps = {
  createWallet,
  setWallet,
  setWalletSaved,
  setWalletToCreatedWallet,
  readMyReputation,
  setAcceptTermsAndConditions,
  push,
  submit
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupWizard)
