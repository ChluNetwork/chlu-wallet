import React, { Component } from 'react'
import PropTypes from 'prop-types'
// redux
import { connect } from 'react-redux'
import { toggleComingSoonModal } from '../../store/modules/ui/comingSoonModal'
import { formValueSelector } from 'redux-form'
// components
import RaisedButton from 'material-ui/RaisedButton'
import ComingSoon from '../../components/ComingSoon'
import CustomerWalletForm from './CustomerWalletForm'
// styles
import './CustomerWallet.css'
// assets
import { buttonsData } from './data'

class CustomerWalletComponent extends Component {
  static propTypes = {
    toggleModal: PropTypes.func.isRequired,
    modalOpen: PropTypes.bool.isRequired,
    isReviewOpen: PropTypes.bool
  }

  handleSubmit = (data) => {
    console.log('sending payment with the following... ')
    console.log(data)
  }

  render() {
    const { toggleModal, modalOpen, isReviewOpen } = this.props
    return (
      <div className='customer-wallet-form'>
        <h3>Payment for Shinny New Toy $400</h3>
        <div className='select-crypto'>
          <p>Select the currency you want pay in</p>
          {buttonsData.map(({ label, disabled }, idx) => (
            <RaisedButton
              key={idx}
              label={label}
              primary
              disabled={disabled}
              className='btn__crypto-selector'
              onClick={toggleModal}
            />
          ))}
          <CustomerWalletForm
            onSubmit={this.handleSubmit}
            isReviewOpen={isReviewOpen}
          />
        </div>
        <ComingSoon
          open={modalOpen}
          closeModal={toggleModal}
        />
      </div>
    )
  }
}

const selector = formValueSelector('customer-wallet-form')

const mapStateToProps = state => ({
  modalOpen: state.ui.comingSoonModal.open,
  isReviewOpen: selector(state, 'reviewOpen')
})

const mapDispatchToProps = dispatch => ({
  toggleModal: () => dispatch(toggleComingSoonModal())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerWalletComponent)
