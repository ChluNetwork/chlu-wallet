import React, { Component } from 'react'
import { shape, bool, string, oneOfType } from 'prop-types'
// redux
import { connect } from 'react-redux'
// helpers
import get from 'lodash/get'
// libs
import { Link } from 'react-router'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { toastr } from 'react-redux-toastr'
import fileDownload from 'js-file-download'
// components
import Button from 'material-ui/Button'
// styles
import './style.css'
import { buttonStyle } from 'styles/inlineStyles/containers/Customer/settings'

class Settings extends Component {
  static propTypes = {
    wallet: shape({
      mnemonic: string,
      createWallet: shape({ mnemonic: oneOfType([bool, string]) })
    })
  }

  handleCopy = (data) => data ? toastr.success('success', 'Copying success') : toastr.error('failed', 'Copying failed')
  handleDownload = (mnemonic) => () => fileDownload(mnemonic, 'mnemonic_key.txt')

  render () {
    const { wallet } = this.props
    const mnemonic = get(wallet, 'mnemonic')

    return (
      <div className='page-container settings color-main'>
        <div className='container'>
          <div className='settings-header font-weight-bold'>Settings</div>
          <div className='settings-label font-weight-bold color-light'>Your mnemonic key</div>
        </div>
        <div className='section-content container-border-top container-border-bottom'>
          <div className='container settings-section'>
            {mnemonic
              ? mnemonic
              : 'Mnemonic does not exist. Have you created a wallet yet?'
            }
            {mnemonic
              ? <div className='settings-section__buttons'>
                <Button
                  {...buttonStyle}
                  label='Download mnemonic'
                  onClick={this.handleDownload(mnemonic)}
                />
                <CopyToClipboard text={mnemonic} onCopy={this.handleCopy}>
                  <Button
                    {...buttonStyle}
                    label='Copy mnemonic'
                  />
                </CopyToClipboard>
              </div>
              : <div className='settings-section__buttons'>
                <Link to='/'>
                  <Button
                    {...buttonStyle}
                    label='Create new wallet'
                  />
                </Link>
              </div>
            }
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = store => ({
  wallet: store.data.wallet
})

export default connect(mapStateToProps)(Settings)
