import React, { Component } from 'react'
import { func, bool, number, oneOfType, object } from 'prop-types'
// redux
import { connect } from 'react-redux'
import { setRatingForCustomerWallet } from 'store/modules/components/CustomerWallet'
import { submitPayment } from 'store/modules/data/payment'
import { formValueSelector } from 'redux-form'
// libs
import { toastr } from 'react-redux-toastr'
// components
import CustomerWalletForm from './CustomerWalletForm'
// assets
import { buttonsData } from '../assets/data'

class CustomerWalletFormWrapper extends Component {
  static propTypes = {
    submitPayment: func,
    isReviewOpen: bool,
    loading: bool,
    rating: number,
    setRating: func,
    rates: oneOfType([object, bool])
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
    const { isReviewOpen, loading, rating, toggleModal, priceBtc } = this.props

    return (
      <CustomerWalletForm
        onSubmit={this.handleSubmit}
        onStarClick={this.onStarClick}
        ratingValue={rating}
        isReviewOpen={isReviewOpen}
        loading={loading}
        buttonsData={buttonsData}
        toggleModal={toggleModal}
        priceBtc={priceBtc}
      />
    )
  }
}

const selector = formValueSelector('customer-wallet-form')

const mapStateToProps = state => ({
  isReviewOpen: selector(state, 'reviewOpen'),
  loading: state.data.payment.loading,
  rating: state.components.customerWallet.rating,
  rates: state.data.fxRates.rates
})

const mapDispatchToProps = dispatch => ({
  submitPayment: data => dispatch(submitPayment(data)),
  setRating: data => dispatch(setRatingForCustomerWallet(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(CustomerWalletFormWrapper)
