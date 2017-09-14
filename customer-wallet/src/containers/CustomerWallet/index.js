import React, { Component } from 'react'
import PropTypes from 'prop-types'
// redux
import { connect } from 'react-redux'
import { toggleComingSoonModal } from 'store/modules/ui/comingSoonModal'
import { submitPayment } from 'store/modules/payment'
import { formValueSelector } from 'redux-form'
// libs
import { fx } from 'money'
import { toastr } from 'react-redux-toastr'
// components
import RaisedButton from 'material-ui/RaisedButton'
import ComingSoonModal from 'components/ComingSoon'
import CustomerWalletForm from './CustomerWalletForm'
// utils
import { getExchangeRates } from 'utils/exchangeReq'
// styles
import './CustomerWallet.css'
// assets
import { buttonsData } from './data'

class CustomerWalletComponent extends Component {

  componentWillMount () {
    getExchangeRates().then((data) => {
      if (data) {
        fx.rates = data.rates
        fx.base = data.base
      }
    })
  }

  handleSubmit (data) {
    const { submitPayment } = this.props
    submitPayment(data)
      .then((response) => {
        console.log(response)
        toastr.success('success', 'Payment success')
      })
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
        <ComingSoonModal
          open={modalOpen}
          closeModal={toggleModal}
        />
      </div>
    )
  }
}

CustomerWalletComponent.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  submitPayment: PropTypes.func.isRequired,
  modalOpen: PropTypes.bool.isRequired,
  isReviewOpen: PropTypes.bool
}


const selector = formValueSelector('customer-wallet-form')

const mapStateToProps = state => ({
  modalOpen: state.ui.comingSoonModal.open,
  isReviewOpen: selector(state, 'reviewOpen')
})

const mapDispatchToProps = dispatch => ({
  toggleModal: () => dispatch(toggleComingSoonModal()),
  submitPayment: data => dispatch(submitPayment(data))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerWalletComponent)
