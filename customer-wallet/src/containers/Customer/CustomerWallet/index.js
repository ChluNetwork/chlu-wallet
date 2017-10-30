import React, { Component } from 'react'
import PropTypes from 'prop-types'
// redux
import { connect } from 'react-redux'
import { toggleComingSoonModal } from 'store/modules/ui/comingSoonModal'
// libs
import { actions } from 'shared-libraries/lib'
import { setFxRates, convertFromUsdToBtc } from 'lib/fxRates'
// components
import ComingSoonModal from 'components/Modals/ComingSoonModal'
import CustomerWalletFormWrapper from './CustomerWalletForm'
// styles
import './styles.css'
// constants
const { dataActions: { fxRates: { getRates } } } = actions

class CustomerWalletPage extends Component {
  static propTypes = {
    toggleModal: PropTypes.func,
    modalOpen: PropTypes.bool,
    rates: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    getRates: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { rates } = this.props

    if(!rates) {
      this.props.getRates()
        .then(response => setFxRates(response))
        .catch(error => console.log(error))
    }
  }

  render() {
    const { toggleModal, modalOpen, price = 400 } = this.props
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
  modalOpen: state.ui.comingSoonModal.open,
  rates: state.data.fxRates.rates
})

const mapDispatchToProps = dispatch => ({
  toggleModal: () => dispatch(toggleComingSoonModal()),
  getRates: () => dispatch(getRates())
})

export default connect(mapStateToProps, mapDispatchToProps)(CustomerWalletPage)
