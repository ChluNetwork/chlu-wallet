import React, { Component } from 'react'
import { func, bool, number, oneOfType, object, shape, string } from 'prop-types'
// redux
import { connect } from 'react-redux'
import { setRatingForCustomerWallet } from 'store/modules/components/CustomerWallet'
import { submitPayment } from 'store/modules/data/payment'
import { formValueSelector } from 'redux-form'
import { toggleComingSoonModal } from 'store/modules/ui/modal'
// libs
import { round } from 'lodash'
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
    wallet: shape({ addresses: string }),
    rates: oneOfType([object, bool]),
    comingSoonModal: shape({ isOpen: bool }),
    toggleComingSoonModal: func,
    convertBitsToSatoshi: func
  }

  static contextTypes = {
    blockchainClient: object
  }

  constructor(props) {
    super(props)

    const addressesString = props.wallet.addresses
    const addresses = JSON.parse(addressesString)

    this.state = {
      activeAddress: addresses[0],
      paymentType: 'cryptocurrency'
    }
  }

  handleChangeAddress = (activeAddress) => this.setState({ activeAddress })

  handleSubmit = ({ toAddress, amountBtc, review }) => {
    const { rating, convertBitsToSatoshi } = this.props
    const { blockchainClient } = this.context
    const { activeAddress } = this.state
    const amountSatoshi = round(convertBitsToSatoshi(parseFloat(amountBtc || 0)))
    this.props.submitPayment({
      rating,
      blockchainClient,
      amountSatoshi,
      activeAddress,
      toAddress,
      review
    })
  }

  onSwitchPaymentType = () => {
    const paymentTypesValue = {
      cryptocurrency: 'masterCard',
      masterCard: 'cryptocurrency',
    }

    this.setState(({ paymentType }) => ({ paymentType: paymentTypesValue[paymentType] }))
  }

  onStarClick = rating => this.props.setRating(rating)

  render () {
    const { activeAddress, paymentType } = this.state
    const {
      isReviewOpen,
      loading,
      rating,
      priceBtc,
      comingSoonModal: { isOpen },
      toggleComingSoonModal,
      wallet: { addresses },
      checkout: {
        data: popr,
        loading: checkoutLoading,
        error: checkoutError
      }
    } = this.props
    const isDisabledSubmit = !popr || checkoutLoading || checkoutError

    return (
      <div>
        <CustomerWalletForm
          onSubmit={this.handleSubmit}
          onStarClick={this.onStarClick}
          switchPaymentType={this.onSwitchPaymentType}
          handleChangeAddress={this.handleChangeAddress}
          ownAddresses={JSON.parse(addresses)}
          activeAddress={activeAddress}
          ratingValue={rating}
          isReviewOpen={isReviewOpen}
          loading={loading}
          buttonsData={buttonsData}
          priceBtc={priceBtc}
          showModal={toggleComingSoonModal}
          isDisabledSubmit={isDisabledSubmit}
          isCreditCardPayment={paymentType === 'masterCard'}
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
  comingSoonModal: state.ui.modal.comingSoonModal,
  wallet: state.data.wallet,
  checkout: state.data.checkout
})

const mapDispatchToProps = dispatch => ({
  submitPayment: data => dispatch(submitPayment(data)),
  setRating: data => dispatch(setRatingForCustomerWallet(data)),
  toggleComingSoonModal: () => dispatch(toggleComingSoonModal())
})

export default connect(mapStateToProps, mapDispatchToProps)(CustomerWalletFormWrapper)
