import React, { Component } from 'react'
import PropTypes from 'prop-types'
// redux
import { connect } from 'react-redux'
import { submitPayment } from 'store/modules/data/payment'
import { formValueSelector } from 'redux-form'
// libs
import { fx } from 'money'
import { toastr } from 'react-redux-toastr'
// utils
import { getExchangeRates } from 'utils/exchangeReq'
// components
import CustomerWalletForm from './CustomerWalletForm'

import { setRatingForCustomerWallet } from 'store/modules/components/CustomerWallet'


class CustomerWalletFormWrapper extends Component {

  static propTypes = {
    submitPayment: PropTypes.func.isRequired,
    isReviewOpen: PropTypes.bool,
    loading: PropTypes.bool,
    rating: PropTypes.number.isRequired,
    setRating: PropTypes.func.isRequired
  }

  componentWillMount () {
    getExchangeRates().then((data) => {
      if (data) {
        fx.rates = data.rates
        fx.base = data.base
      }
    })
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

  onStarClick = rating => {
    const { setRating } = this.props

    setRating(rating)
  }

  render () {
    const { isReviewOpen, loading, rating } = this.props
    return (
      <CustomerWalletForm
        onSubmit={this.handleSubmit}
        onStarClick={this.onStarClick}
        ratingValue={rating}
        isReviewOpen={isReviewOpen}
        loading={loading}
      />
    )
  }
}

const selector = formValueSelector('customer-wallet-form')

const mapStateToProps = state => ({
  isReviewOpen: selector(state, 'reviewOpen'),
  loading: state.data.payment.loading,
  rating: state.components.customerWallet.rating
})

const mapDispatchToProps = dispatch => ({
  submitPayment: data => dispatch(submitPayment(data)),
  setRating: data => dispatch(setRatingForCustomerWallet(data))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerWalletFormWrapper)
