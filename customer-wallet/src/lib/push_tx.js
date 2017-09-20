import getBlockchainClient from './blockchain_client'
import promisify from 'es6-promisify'

class PushTx {

  constructor () {
    this.blockchainClient = getBlockchainClient()
    console.log(this.blockchainClient.pushTX)
    this.pushTX = promisify(this.blockchainClient.pushTX, this.blockchainClient)
  }

  push (txHash) {
    return this.pushTX(txHash).then((tx) => {
       return tx
    })
  }
}

export default PushTx
