import React from 'react'
import Wizard from 'components/MaterialDashboardPro/Wizard'
import Step1 from './WizardSteps/Step1'
import Step2 from './WizardSteps/Step2'
import Step3 from './WizardSteps/Step3'

function SignupWizard(props) {
    return <Wizard
        validate
        steps={[
        { stepName: '1: Create Your Wallet', stepComponent: Step1, stepId: 'get started' },
        { stepName: '2: Save Your D.I.D.', stepComponent: Step2, stepId: 'about' },
        { stepName: '3: Claim Your Reputation', stepComponent: Step3, stepId: 'reviews' },
        ]}
        title="Let's Get Started"
        subtitle='Follow The Three Easy Steps Below To Begin'
    />
}

export default SignupWizard