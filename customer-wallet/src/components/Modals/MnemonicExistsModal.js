import React from 'react'
import { bool, func } from 'prop-types'
// libs
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

const MnemonicExists = ({ isOpen, handleCancel, handleContinue }) => {
  const actions = [
    <FlatButton
      label='CONTINUE'
      onClick={handleContinue}
      primary
    />,
    <FlatButton
      label='CANCEL'
      onClick={handleCancel}
      primary
    />
  ]

  return (
    <Dialog
      title='Warning'
      actions={actions}
      modal
      open={isOpen}
    >
      You have an existing wallet, are you sure you want to replace it?
      If you have not saved the old mnemonic we recommend you do so first,
      otherwise you will lose all access to your coins
    </Dialog>
  )
}

MnemonicExists.propTypes = {
  isOpen: bool,
  handleCancel: func,
  handleContinue: func
}

export default MnemonicExists
