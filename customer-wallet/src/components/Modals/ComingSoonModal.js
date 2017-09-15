import React from 'react'
import PropTypes from 'prop-types'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

class ComingSoon extends React.Component {
  static propTypes = {
    closeModal: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired
  }

  renderModalActions () {
    const { closeModal } = this.props
    return [
      <FlatButton
        label='OK'
        onClick={closeModal}
        primary
      />
    ]
  }

  render() {
    const { open, closeModal } = this.props
    const actions = this.renderModalActions()
    return (
      <div>
        <Dialog
          title='Work in progress'
          actions={actions}
          modal={false}
          open={open}
          onRequestClose={closeModal}
        >
          Currently we only support Bitcoin, all the other currencies shown here are coming soon.
        </Dialog>
      </div>
    )
  }
}

export default ComingSoon
