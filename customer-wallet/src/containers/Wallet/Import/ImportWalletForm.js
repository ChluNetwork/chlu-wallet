import React from 'react'
import { func } from 'prop-types'
import FormInput from 'components/Form/Input'
// libs
import { reduxForm, Field } from 'redux-form'

const ImportWalletForm = ({ handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <Field
      placeholder='Your mnemonic here...'
      name='mnemonic'
      type='text'
      multiLine
      fullWidth
      component={FormInput}
    />
  </form>
)

ImportWalletForm.propTypes = {
  submit: func
}

export default reduxForm({ form: 'import-wallet-form' })(ImportWalletForm)
