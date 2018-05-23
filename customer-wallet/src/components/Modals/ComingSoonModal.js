import React from 'react'
import { bool, func } from 'prop-types'
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button'

const ComingSoon = ({ isOpen, hideModal }) => {
  const actions = [
    <Button
      label='OK'
      onClick={hideModal}
      primary
    />
  ]

  return (
    <div>
      <Dialog
        title='Work in progress'
        actions={actions}
        open={isOpen}
        onRequestClose={hideModal}
      >Currently we only support Bitcoin, all the other currencies shown here are coming soon.</Dialog>
    </div>
  )
}

ComingSoon.defaultProps = {
  isOpen: false
}

ComingSoon.propTypes = {
  isOpen: bool,
  hideModal: func
}

export default ComingSoon
