import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux'
import { createAction } from 'redux-actions'
import { TOGGLE_COMING_SOON } from './ComingSoonDucks'

class ComingSoonComponent extends React.Component {
    render() {
        const actions = [
            <FlatButton
                label="OK"
                primary={true}
                onClick={this.props.onClickOK}
            />,
        ];
        
        return (
            <div>
                <Dialog
                    title="Work in progress"
                    actions={actions}
                    modal={false}
                    open={this.props.open}
                    onRequestClose={this.handleClose}
                >
                    Currently we only support Bitcoin, all the other currencies shown here are coming soon.
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        open: state.comingSoon.open
    }
}

const mapDispatchToProps = dispatch => {
  return {
      onClickOK: id => {
          dispatch(createAction(TOGGLE_COMING_SOON)())
    }
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ComingSoonComponent)
