import React from 'react'
import PropTypes from 'prop-types'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

class ComingSoon extends React.Component {
  static propTypes = {
    closeModal: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired
  }

  handleClose () {
  }

  renderModalActions () {
    const { closeModal } = this.props
    return [
      <FlatButton
        label='OK'
        primary={true}
        onClick={closeModal}
      />
    ]
  }

  render() {
    const actions = this.renderModalActions()
    return (
      <div>
        <Dialog
          title='Work in progress'
          actions={actions}
          modal={false}
          open={this.props.open}
          onRequestClose={this.handleClose}
        >
          Currently we only support Bitcoin, all the other currencies shown here are coming soon.
        </Dialog>
      </div>
    )
  }
}

export default ComingSoon
