import getBlockchainClient from './blockchain_client'
import promisify from 'es6-promisify'

class GetUtxos {

  constructor () {
    this.blockchainClient = getBlockchainClient()
    this.getAddr = promisify(this.blockchainClient.getAddr, this.blockchainClient)
  }

  getFromBlockchain (address) {
    return this.getAddr(address, { unspentOnly: true }).then((txs) => {
       return txs
    })
  }
}

export default GetUtxos
