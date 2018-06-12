import React from 'react'
import Wizard from 'components/MaterialDashboardPro/Wizard'
import Step1 from './WizardSteps/Step1'
import Step2 from './WizardSteps/Step2'
import Step3 from './WizardSteps/Step3'
// redux
import { connect } from 'react-redux'
import { createWallet, resetWallet, setWalletSaved } from 'store/modules/components/CreateWallet'
import { setWallet } from 'store/modules/data/wallet'
import { toastr } from 'react-redux-toastr'
// helpers
import { saveWalletToLocalStorage } from 'helpers/wallet';
import { downloadWallet as downloadWalletFile } from 'helpers/wallet'
import { pick } from 'lodash'

function SignupWizard(props) {

    function downloadWallet() {
        const { wallet, walletCreated } = props
        if (wallet && wallet.did) {
            downloadWalletFile(pick(wallet, ['did', 'bitcoinMnemonic', 'testnet']))
        } else {
            downloadWalletFile(walletCreated)
        }
        props.setWalletSaved(true)
    }

    function areWalletKeysSaved() {
        const { walletSaved } = props
        return walletSaved
    }

    function validate(step) {
        const { wallet } = props
        if (step === 1 && !(areWalletKeysSaved() || (wallet && wallet.did))) {
            toastr.warning(
                'Please save your wallet',
                'Once you have saved it you will be able to access the wallet'
            )
            return false
        }
        return true
    }

    function onChangeStep(from, to) {
        const { walletCreated, createWallet, resetWallet, setWallet, wallet } = props
        if (to === 1 && !walletCreated) createWallet()
        if (to === 2 && !(wallet && wallet.did)) {
            // set and save full wallet
            setWallet(walletCreated)
            saveWalletToLocalStorage(walletCreated)
            resetWallet() // deletes temp wallet
            toastr.success('Wallet Created', 'Your Wallet is ready to go!')
        }
    }

    return <Wizard
        validate={validate}
        onChangeStep={onChangeStep}
        steps={[
            {
                stepName: '1: Create Your Wallet',
                stepComponent: Step1,
                stepId: 'get started',
                stepProps: {
                    ...props
                }
            },
            {
                stepName: '2: Save Your D.I.D.',
                stepComponent: Step2,
                stepId: 'about',
                stepProps: {
                    ...props,
                    downloadWallet
                }
            },
            {
                stepName: '3: Claim Your Reputation',
                stepComponent: Step3,
                stepId: 'reviews'
            },
        ]}
        title="Let's Get Started"
        subtitle='Follow The Three Easy Steps Below To Begin'
    />
}

const mapStateToProps = store => ({
  loading: store.components.createWallet.loading,
  walletSaved: store.components.createWallet.walletSaved,
  walletCreated: store.components.createWallet.walletCreated,
  wallet: store.data.wallet
})

const mapDispatchToProps = {
  createWallet,
  setWallet,
  resetWallet,
  setWalletSaved
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupWizard)