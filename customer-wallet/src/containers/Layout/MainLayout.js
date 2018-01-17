import React, { Component } from 'react'
import { any, object } from 'prop-types'
// libs
import ReduxToastr from 'react-redux-toastr'
// chlu support
import ImportPrivateKey from 'chlu-wallet-support-js/lib/import_private_key'
import CreateChluTransaction from 'chlu-wallet-support-js/lib/create_chlu_transaction'

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
    createChluTransaction: (() => {
      const tr = new CreateChluTransaction(blockCypherKey)
      tr.getImportedKey('alter ankle cart harvest ecology sign athlete congress desert scare planet love')

      return tr
    })()
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
