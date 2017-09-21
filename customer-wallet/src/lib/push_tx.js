import getBlockchainClient from './blockchain_client'
import { isEmpty } from 'lodash'

class PushTx {

  constructor () {
    this.blockchainClient = getBlockchainClient()
  }

  push (txHash) {
    return new Promise((resolve, reject) => {
      this.blockchainClient.pushTX(txHash, (err, tx) => {
        if ( err || !isEmpty(tx.error) ) {
          reject(err || tx.error)
        } else {
          resolve(tx)
        }
      })
    })
  }

}

export default PushTx
