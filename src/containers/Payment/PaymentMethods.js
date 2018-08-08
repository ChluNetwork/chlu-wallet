import React from 'react'
// components
import { Button, withStyles, CardActions, Dialog, DialogActions, DialogContentText, DialogContent, DialogTitle } from '@material-ui/core';
// redux
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { toggleComingSoonModal } from 'store/modules/ui/modal'
// assets
import { buttonsData } from './assets/data'

const style = theme => ({
  icon: {
    height: '20px',
    marginRight: theme.spacing.unit
  }
})

function PaymentMethods({ classes, toggleComingSoonModal, comingSoonModal }) {

  const onClick = label => {
    if (label !== 'BTC') toggleComingSoonModal()
  }

  return <CardActions>
        {buttonsData.map(({ label, active, icon, iconBlue }, idx) => (
            <Button
                variant={active ? 'raised' : 'flat'}
                key={idx}
                onClick={() => onClick(label)}
            >
                <img src={icon} alt={label} className={classes.icon} />
                {label}
            </Button>
        ))}
        <Dialog
            open={comingSoonModal.isOpen}
            onClose={toggleComingSoonModal}
        >
          <DialogTitle>Work in Progress</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Currently we only support Bitcoin, all the other currencies shown here are coming soon.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={toggleComingSoonModal} color='primary' autoFocus>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
    </CardActions>
}

const mapStateToProps = state => ({
  comingSoonModal: state.ui.modal.comingSoonModal
})

const mapDispatchToProps = dispatch => ({
  toggleComingSoonModal: () => dispatch(toggleComingSoonModal())
})

export default compose(
    connect( mapStateToProps, mapDispatchToProps),
    withStyles(style)
)(PaymentMethods)
