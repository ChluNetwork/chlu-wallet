import React, { Component } from 'react'
import { func, shape, bool, oneOfType, object } from 'prop-types'
// redux
import { connect } from 'react-redux'
import { setWallet } from 'store/modules/data/wallet'
// helpers
import replace from 'helpers/replace'
import { loginDestination } from '../Wallet'
// libs
import { importWallet } from 'helpers/wallet'
import { Link } from 'react-router-dom'
// components
import FileReaderInput from 'react-file-reader-input'
import WalletCard from '../Card'
import Button from '@material-ui/core/Button'
import { toastr } from 'react-redux-toastr'
import { CardActions, CardHeader, Avatar, Divider, CardContent } from '@material-ui/core';
// icons
import WalletIcon from '@material-ui/icons/AccountBalanceWallet'

class ImportWallet extends Component {
  static propTypes = {
    wallet: object,
    mnemonicExistsModal: shape({
      isOpen: bool,
      data: oneOfType([bool, object])
    }),
    toggleMnemonicExists: func
  }

  static contextTypes = {
    blockchainClient: object
  }

  importWallet(str) {
    try {
      const wallet = importWallet(str)
      this.props.setWallet(wallet)
      toastr.success('Wallet imported', 'Your existing data has been imported')
      replace(loginDestination)
    } catch (error) {
      toastr.error('Could not import Wallet', 'Something went wrong')
      console.log(error)
    }
  }

  fileChanged(event, results) {
    if (results.length > 0) {
      // docs: https://github.com/ngokevin/react-file-reader-input#usage
      this.importWallet(results[0][0].target.result)
    }
  }

  render () {
    return (
      <div>
        <WalletCard>
          <CardHeader
            avatar={<Avatar><WalletIcon/></Avatar>}
            title='Import a Chlu Wallet'
            subheader='Access your existing funds and Identity from this device'
          />
          <CardContent>
            Don't have a wallet yet? <Link to='/setup/create'>Create a new one</Link>
          </CardContent>
          <CardActions>
            <FileReaderInput
              as='text'
              onChange={this.fileChanged.bind(this)}
              accept='application/json'
            >
              <Button variant='raised' color='primary'>
                Import from File
              </Button>
            </FileReaderInput>
          </CardActions>
          <Divider/>
        </WalletCard>
      </div>
    )
  }
}

const mapStateToProps = store => ({
  wallet: store.data.wallet
})

const mapDispatchToProps = {
  setWallet
}

export default connect(mapStateToProps, mapDispatchToProps)(ImportWallet)
