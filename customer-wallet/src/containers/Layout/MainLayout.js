import React, { Component } from 'react'
import { any, object } from 'prop-types'
// libs
import ReduxToastr from 'react-redux-toastr'
// chlu support
import ImportPrivateKey from 'chlu-wallet-support-js/lib/import_private_key'
import CreateChluTransaction from 'chlu-wallet-support-js/lib/create_chlu_transaction'
// toastr
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
// styles
import './style.css'

const blockCypherKey = process.env.REACT_APP_BLOCKCYPHER_TOKEN

class MainLayout extends Component {
  static propTypes = {
    children: any,
  }

  static childContextTypes = {
    blockchainClient: object
  }

  blockchainClient = {
    importPrivateKey: new ImportPrivateKey(),
    createChluTransaction: new CreateChluTransaction(blockCypherKey)
  }

  getChildContext = () => ({ blockchainClient: this.blockchainClient })

  render () {
    const { children } = this.props

    return (
      <div>
        {children}
        <ReduxToastr
          timeOut={5000}
          preventDuplicates
          position='top-right'
          transitionIn='fadeIn'
          transitionOut='fadeOut'
          newestOnTop
        />
      </div>
    )
  }
}

export default MainLayout
