import React, { Component } from 'react'
import { func, bool, number, oneOfType, object, shape, string, arrayOf } from 'prop-types'
import { compose } from 'recompose'
// redux
import { connect } from 'react-redux'
import { setRatingForCustomerWallet } from 'store/modules/components/CustomerWallet'
import { submitPayment } from 'store/modules/data/payment'
import { formValueSelector } from 'redux-form'
import { toggleComingSoonModal } from 'store/modules/ui/modal'
import { getCheckout } from 'store/modules/data/checkout'
// libs
import { round, isEmpty } from 'lodash'
import CircularProgress from '@material-ui/core/CircularProgress';
import CustomerWalletForm from './CustomerWalletForm'
import ComingSoonModal from 'components/Modals/ComingSoonModal'
// Hoc
import withFxRates from 'containers/Hoc/withFxRates'
// assets
import { buttonsData } from '../assets/data'
// helpers
import { getAddress } from 'helpers/wallet';

class CustomerWalletFormWrapper extends Component {
  static propTypes = {
    submitPayment: func,
    isReviewOpen: bool,
    loading: bool,
    rating: number,
    setRating: func,
    wallet: shape({ addresses: arrayOf(string) }),
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

    this.state = {
      activeAddress: getAddress(props.wallet),
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
      loading: formLoading,
      rating,
      priceBtc,
      comingSoonModal: { isOpen },
      toggleComingSoonModal,
      wallet: { addresses },
      checkout: {
        data: popr,
        loading: checkoutLoading,
        error: checkoutError
      },
      convertFromUsdToBits,
      getCheckout: getPoPR
    } = this.props
    const emptyPopr = isEmpty(popr)
    if (emptyPopr || checkoutError) {
      getCheckout()
      return 'Getting PoPR...' // TODO: improve UI here
    }
    const isDisabledSubmit = emptyPopr || checkoutLoading || checkoutError
    const loading = checkoutLoading || formLoading
    const amountUsd = popr.amount / 100
    const amountBits = convertFromUsdToBits(amountUsd)

    if (loading) {
      return <CircularProgress style={{ margin:'auto',display:'block' }}/>
    }

    return (
      <div>
        <CustomerWalletForm
          onSubmit={this.handleSubmit}
          onStarClick={this.onStarClick}
          switchPaymentType={this.onSwitchPaymentType}
          handleChangeAddress={this.handleChangeAddress}
          ownAddresses={addresses}
          activeAddress={activeAddress}
          initialValues={{
            toAddress: popr.vendorAddress,
            amountUsd,
            amountBtc: amountBits // TODO: fix
          }}
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
  toggleComingSoonModal: () => dispatch(toggleComingSoonModal()),
  getCheckout: () => dispatch(getCheckout())
})

export default compose(
  withFxRates,
  connect(mapStateToProps, mapDispatchToProps)
)(CustomerWalletFormWrapper)
