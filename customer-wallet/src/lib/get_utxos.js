import getBlockchainClient from './blockchain_client'

class GetUtxos {

  constructor () {
    this.blockchainClient = getBlockchainClient()
  }

  getFromBlockchain (address) {
    return new Promise((resolve, reject) => {
      this.blockchainClient.getAddr(address, { unspentOnly: true }, (err, txs) => {
        if ( err ) {
          reject(err)
        } else {
          resolve(txs)
        }
      })
    })
  }
}

export default GetUtxos
