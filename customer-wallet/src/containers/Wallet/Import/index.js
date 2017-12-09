import React, { Component } from 'react'
// libs
import { submit } from 'redux-form'
import { connect } from 'react-redux'
// components
import RaisedButton from 'material-ui/RaisedButton'
import ImportWalletForm from './ImportWalletForm'
// styles
import './style.css'
import { buttonStyle } from 'styles/inlineStyles/containers/Wallet/Import'

class ImportWallet extends Component {
  onFormSubmit = () => this.props.submit('import-wallet-form')

  handleSubmit = (data) => {
    console.log(data)
  }

  render () {
    return (
      <div className='page-container import'>
        <div className='container import-header color-light font-weight-bold'>Import Wallet</div>
        <div className='section-content'>
          <div className='container'>
            <div className='title color-main'>Enter your mnemonic to import your BTC wallet</div>
            <ImportWalletForm onSubmit={this.handleSubmit} />
            <div className='button'>
              <RaisedButton
                {...buttonStyle}
                fullWidth
                label='Import wallet'
                className='submit-button'
                onClick={this.onFormSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = {
  submit
}

export default connect(null, mapDispatchToProps)(ImportWallet)
