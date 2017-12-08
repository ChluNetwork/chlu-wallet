import React, { Component } from 'react'
import { func, bool, oneOfType, object } from 'prop-types'
// redux
import { connect } from 'react-redux'
import { compose } from 'redux'
import { toggleComingSoonModal } from 'store/modules/ui/comingSoonModal'
// hoc
import withFxRates from '../../withFxRates'
// components
import ComingSoonModal from 'components/Modals/ComingSoonModal'
import CustomerWalletFormWrapper from './CustomerWalletForm'
// styles
import './styles.css'

class CustomerWalletPage extends Component {
  static propTypes = {
    toggleModal: func,
    modalOpen: bool,
    rates: oneOfType([object, bool]),
    convertSatoshiToBTC: func,
    convertFromBtcToUsd: func,
    convertFromUsdToBtc: func
  }

  render() {
    const { toggleModal, modalOpen, price = 400, convertFromUsdToBtc } = this.props
    const priceBtc = convertFromUsdToBtc(price)

    return (
      <div className='page-container customer-wallet-form'>
        <div className='container section-head color-main'>
          <div className='section-head__name color-light'>Payment for Shinny New Toy</div>
          <div className='section-head__price-usd'>$ {price}</div>
          <div className='section-head__price-btc'>{priceBtc} BTC</div>
        </div>
        <div className='section-content'>
          <CustomerWalletFormWrapper toggleModal={toggleModal} priceBtc={priceBtc}/>
        </div>
        <ComingSoonModal
          open={modalOpen}
          closeModal={toggleModal}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  modalOpen: state.ui.comingSoonModal.open
})

const mapDispatchToProps = dispatch => ({
  toggleModal: () => dispatch(toggleComingSoonModal())
})

export default compose(
  withFxRates,
  connect(mapStateToProps, mapDispatchToProps)
)(CustomerWalletPage)
