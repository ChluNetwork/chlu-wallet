import React, { Component } from 'react'
import { func, bool, number, oneOfType, object, shape, array } from 'prop-types'
// redux
import { connect } from 'react-redux'
import { setRatingForCustomerWallet } from 'store/modules/components/CustomerWallet'
import { submitPayment } from 'store/modules/data/payment'
import { formValueSelector } from 'redux-form'
import { toggleComingSoonModal } from 'store/modules/ui/modal'
import { getChluIPFS, types } from 'helpers/ipfs'
// libs
import { toastr } from 'react-redux-toastr'
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
    wallet: shape({ addresses: array }),
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

    const { wallet: { addresses } } = props

    this.state = {
      activeAddress: addresses[0],
      isDisabledSubmit: false,
      paymentType: 'cryptocurrency'
    }
  }

  handleChangeAddress = (activeAddress) => this.setState({ activeAddress })

  handleSubmit = ({ toAddress, amountBtc, review }) => {
    this.setState({ isDisabledSubmit: true }, async () => {
      const { rating, convertBitsToSatoshi } = this.props
      const { blockchainClient: { createChluTransaction: tr } } = this.context
      const { activeAddress } = this.state

      const chluIpfs = await getChluIPFS(types.customer)
      const reviewRecord = {
        popr: {
          item_id: 0,
          invoice_id: 0,
          customer_id: 0,
          created_at: 0,
          expires_at: 0,
          currency_symbol: 'USD',
          amount: 400,
          marketplace_url: 'chlu demo',
          marketplace_vendor_url: 'chlu demo',
          key_location: 'chlu demo',
          attributes: [
              {
                  name: 'rating',
                  min_rating: 1,
                  max_rating: 5,
                  description: 'rating',
                  is_required: true
              }
          ],
          chlu_version: 0,
          signature: '-'
        },
        currency_symbol: 'BTC',
        amount: parseFloat(amountBtc || 0),
        customer_address: activeAddress,
        vendor_address: toAddress,
        review_text: review,
        rating,
        chlu_version: 0,
        hash: '-' // TODO: ipfs-support needs to calculate this on its own
      }

      let contentHash = null;
      try {
        contentHash = await chluIpfs.storeReviewRecord(reviewRecord)
      } catch(exception) {
        console.log(exception)
        throw exception
      }

      tr.create(activeAddress, toAddress, round(convertBitsToSatoshi(parseFloat(amountBtc || 0))), null, contentHash)
        .then((response) => {
          console.log(response)
          toastr.success('success', 'Payment success')
          this.setState({ isDisabledSubmit: false })
        })
        .catch(error => {
          console.log(error)
          this.setState({ isDisabledSubmit: false })
          throw error
        })
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
    const { activeAddress, isDisabledSubmit, paymentType } = this.state
    const {
      isReviewOpen,
      loading,
      rating,
      priceBtc,
      comingSoonModal: { isOpen },
      toggleComingSoonModal,
      wallet: { addresses }
    } = this.props

    return (
      <div>
        <CustomerWalletForm
          onSubmit={this.handleSubmit}
          onStarClick={this.onStarClick}
          switchPaymentType={this.onSwitchPaymentType}
          handleChangeAddress={this.handleChangeAddress}
          ownAddresses={addresses}
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
  wallet: state.data.wallet
})

const mapDispatchToProps = dispatch => ({
  submitPayment: data => dispatch(submitPayment(data)),
  setRating: data => dispatch(setRatingForCustomerWallet(data)),
  toggleComingSoonModal: () => dispatch(toggleComingSoonModal())
})

export default connect(mapStateToProps, mapDispatchToProps)(CustomerWalletFormWrapper)
