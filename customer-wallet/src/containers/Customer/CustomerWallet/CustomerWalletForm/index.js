import React, { Component } from 'react'
import { func, bool, number, oneOfType, object, shape } from 'prop-types'
// redux
import { connect } from 'react-redux'
import { setRatingForCustomerWallet } from 'store/modules/components/CustomerWallet'
import { submitPayment } from 'store/modules/data/payment'
import { formValueSelector } from 'redux-form'
import { toggleComingSoonModal } from 'store/modules/ui/modal'
// libs
import { toastr } from 'react-redux-toastr'
// components
import CustomerWalletForm from './CustomerWalletForm'
import ComingSoonModal from 'components/Modals/ComingSoonModal'
// assets
import { buttonsData } from '../assets/data'

class CustomerWalletFormWrapper extends Component {
  static propTypes = {
    submitPayment: func,
    isReviewOpen: bool,
    loading: bool,
    rating: number,
    setRating: func,
    rates: oneOfType([object, bool]),
    comingSoonModal: shape({ isOpen: bool }),
    toggleComingSoonModal: func
  }

  handleSubmit = (data) => {
    const { submitPayment } = this.props
    const { rating } = this.props

    submitPayment({ ...data, rating })
      .then((response) => {
        console.log(response)
        toastr.success('success', 'Payment success')
      })
  }

  onStarClick = rating => this.props.setRating(rating)

  render () {
    const { isReviewOpen, loading, rating, priceBtc, comingSoonModal: { isOpen }, toggleComingSoonModal } = this.props

    return (
      <div>
        <CustomerWalletForm
          onSubmit={this.handleSubmit}
          onStarClick={this.onStarClick}
          ratingValue={rating}
          isReviewOpen={isReviewOpen}
          loading={loading}
          buttonsData={buttonsData}
          priceBtc={priceBtc}
          showModal={toggleComingSoonModal}
        />
        <ComingSoonModal isOpen={isOpen} hideModal={toggleComingSoonModal} />
      </div>
    )
  }
}

const selector = formValueSelector('customer-wallet-form')

const mapStateToProps = state => ({
  isReviewOpen: selector(state, 'reviewOpen'),
  loading: state.data.payment.loading,
  rating: state.components.customerWallet.rating,
  rates: state.data.fxRates.rates,
  comingSoonModal: state.ui.modal.comingSoonModal
})

const mapDispatchToProps = dispatch => ({
  submitPayment: data => dispatch(submitPayment(data)),
  setRating: data => dispatch(setRatingForCustomerWallet(data)),
  toggleComingSoonModal: () => dispatch(toggleComingSoonModal())
})

export default connect(mapStateToProps, mapDispatchToProps)(CustomerWalletFormWrapper)
