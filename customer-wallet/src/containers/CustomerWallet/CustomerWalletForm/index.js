import React, { Component } from 'react'
import PropTypes from 'prop-types'
// redux
import { connect } from 'react-redux'
import { submitPayment } from 'store/modules/payment'
import { formValueSelector } from 'redux-form'
// libs
import { fx } from 'money'
import { toastr } from 'react-redux-toastr'
// utils
import { getExchangeRates } from 'utils/exchangeReq'
// components
import CustomerWalletForm from './CustomerWalletForm'

const initialRating = 0

class CustomerWalletFormWrapper extends Component {

  static propTypes = {
    submitPayment: PropTypes.func.isRequired,
    isReviewOpen: PropTypes.bool,
    loading: PropTypes.bool
  }

  state = {
    rating: initialRating
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
    const { rating } = this.state

    submitPayment({ ...data, rating })
      .then((response) => {
        console.log(response)
        toastr.success('success', 'Payment success')
      })
  }

  onStarClick = (rating) => {
    this.setState({ rating })
  }

  render () {
    const { isReviewOpen, loading } = this.props
    return (
      <CustomerWalletForm
        onSubmit={this.handleSubmit}
        onStarClick={this.onStarClick}
        ratingValue={this.state.rating}
        isReviewOpen={isReviewOpen}
        loading={loading}
      />
    )
  }
}

const selector = formValueSelector('customer-wallet-form')

const mapStateToProps = state => ({
  isReviewOpen: selector(state, 'reviewOpen'),
  loading: state.payment.loading
})

const mapDispatchToProps = dispatch => ({
  submitPayment: data => dispatch(submitPayment(data))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerWalletFormWrapper)
