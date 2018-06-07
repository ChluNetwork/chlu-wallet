import React from 'react'
import { bool, func } from 'prop-types'
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button'
import { DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';

const MnemonicExists = ({ isOpen, handleCancel, handleContinue }) => {
  return (
    <Dialog
      open={isOpen}
    >
      <DialogTitle>Warning</DialogTitle>
      <DialogContent>
        <DialogContentText>
          You have an existing wallet, are you sure you want to replace it?
          If you have not saved the old mnemonic we recommend you do so first,
          otherwise you will lose all access to your coins
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} autoFocus>
          Cancel
        </Button>
        <Button onClick={handleContinue} color='primary'>
          Continue
        </Button>
      </DialogActions> 
    </Dialog>
  )
}

MnemonicExists.propTypes = {
  isOpen: bool,
  handleCancel: func,
  handleContinue: func
}

export default MnemonicExists
