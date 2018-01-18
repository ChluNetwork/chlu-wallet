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
      isDisabledSubmit: false
    }
  }

  handleChangeAddress = (activeAddress) => this.setState({ activeAddress })

  handleSubmit = ({ toAddress, amountBtc }) => {
    this.setState({ isDisabledSubmit: true }, async () => {
      const { rating, convertBitsToSatoshi } = this.props
      const { blockchainClient: { createChluTransaction: tr } } = this.context
      const { activeAddress } = this.state

      const chluIpfs = await getChluIPFS(types.customer)
      const contentHash = await chluIpfs.storeReviewRecord(Buffer.from('fake review record content'))

      tr.create(activeAddress, toAddress, round(convertBitsToSatoshi(parseFloat(amountBtc))), null, contentHash)
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

  onStarClick = rating => this.props.setRating(rating)

  render () {
    const { activeAddress, isDisabledSubmit } = this.state
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
          ownAddresses={addresses}
          activeAddress={activeAddress}
          handleChangeAddress={this.handleChangeAddress}
          ratingValue={rating}
          isReviewOpen={isReviewOpen}
          loading={loading}
          buttonsData={buttonsData}
          priceBtc={priceBtc}
          showModal={toggleComingSoonModal}
          isDisabledSubmit={isDisabledSubmit}
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
