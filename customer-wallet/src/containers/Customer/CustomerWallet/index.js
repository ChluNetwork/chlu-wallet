import React from 'react'
import PropTypes from 'prop-types'
// redux
import { connect } from 'react-redux'
import { toggleComingSoonModal } from 'store/modules/ui/comingSoonModal'
// components
import RaisedButton from 'material-ui/RaisedButton'
import ComingSoonModal from 'components/Modals/ComingSoonModal'
import CustomerWalletForm from './CustomerWalletForm/index'
// styles
import './CustomerWallet.css'
// assets
import { buttonsData } from './assets/data'

const CustomerWalletPage = ({ toggleModal, modalOpen }) => (
  <div className='page-container customer-wallet-form'>
    <h3>Payment for Shinny New Toy $400</h3>
    <div className='select-crypto'>
      <p>Select the currency you want pay in</p>
      {buttonsData.map(({ label, disabled }, idx) => (
        <RaisedButton
          key={idx}
          label={label}
          primary
          disabled={disabled}
          className='btn__crypto-selector'
          onClick={toggleModal}
        />
      ))}
      <CustomerWalletForm />
    </div>
    <ComingSoonModal
      open={modalOpen}
      closeModal={toggleModal}
    />
  </div>
)


CustomerWalletForm.propTypes = {
  toggleModal: PropTypes.func,
  modalOpen: PropTypes.bool
}

const mapStateToProps = state => ({
  modalOpen: state.ui.comingSoonModal.open
})

const mapDispatchToProps = dispatch => ({
  toggleModal: () => dispatch(toggleComingSoonModal())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerWalletPage)
