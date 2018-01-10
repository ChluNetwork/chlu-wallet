import React from 'react'
// libs
import { Link } from 'react-router'
// components
import RaisedButton from 'material-ui/RaisedButton'
// styles
import './style.css'
import { buttonStyle } from 'styles/inlineStyles/containers/Wallet'
// assets
import chluLogo from 'images/svg/chlu-1.svg'

const UnAutorized = () => (
  <div className="page-container wallet">
    <div className='container wallet-header'>
      <img src={chluLogo} className='logo' alt='Chlu' />
    </div>
    <div className='section-content container-border-top container-border-bottom'>
      <div className='container'>
        <div className='title color-main'>Earn rewards for sending and receiving payments</div>
        <div className='buttons'>
          <Link to='wallet/import'>
            <RaisedButton {...buttonStyle} label='Import wallet' />
          </Link>
          <Link to='wallet/create'>
            <RaisedButton {...buttonStyle} label='Create new wallet' />
          </Link>
        </div>
      </div>
    </div>
  </div>
)

export default UnAutorized
