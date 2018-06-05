import React from 'react'
import { bool, func, string } from 'prop-types'
import { Dialog, Button, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';

const ConfirmActionModal = ({ isOpen, confirm, cancel, text }) => {
  return (
    <Dialog
        open={isOpen}
        onClose={cancel}
    >
      <DialogTitle>Are you sure?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {text}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={cancel} autoFocus>
          Cancel
        </Button>
        <Button onClick={confirm} color='primary'>
          Confirm
        </Button>
      </DialogActions> 
    </Dialog>
  )
}

ConfirmActionModal.defaultProps = {
  isOpen: false
}

ConfirmActionModal.propTypes = {
  isOpen: bool,
  hideModal: func,
  text: string
}

export default ConfirmActionModal
