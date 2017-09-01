import React, { Component } from 'react';
import './CustomerWallet.css';
import RaisedButton from 'material-ui/RaisedButton';

import ComingSoon  from './ComingSoon'
import { connect } from 'react-redux'
import { createAction } from 'redux-actions'
import { TOGGLE_COMING_SOON } from './ComingSoonDucks'

class CustomerWalletComponent extends Component {
  render () {
      return (
          <div className="customer-wallet-form">
              <h3>Payment for Shinny New Toy $400</h3>
              <div className='select-crypto'>
                  <p>Select the currency you want pay in</p>
                  <RaisedButton label="BTC" primary={true} disabled={true} className='btn__crypto-selector' onClick={this.props.onClick} />
                  <RaisedButton label="LTC" primary={true} className='btn__crypto-selector' onClick={this.props.onClick} />
                  <RaisedButton label="ZCash" primary={true} className='btn__crypto-selector' onClick={this.props.onClick} />
                  <RaisedButton label="Ether" primary={true} className='btn__crypto-selector' onClick={this.props.onClick} /> 
                  <RaisedButton label="BCC" primary={true} className='btn__crypto-selector' onClick={this.props.onClick} /> 
              </div>
              <ComingSoon />
          </div>
    )
  }
}

const mapStateToProps = state => {
    return {}
}

const mapDispatchToProps = dispatch => {
    return {
        onClick: () => {
            dispatch(createAction(TOGGLE_COMING_SOON)())
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CustomerWalletComponent)
