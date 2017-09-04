// import blocktrail from 'blocktrail-sdk'
import getBlocktrailClient from './blocktrail_client'

class GetUtxos {

  constructor () {
    this.blocktrailClient = getBlocktrailClient()
  }

  getFromBlocktrail (address) {
    return this.blocktrailClient.addressTransactions(address).then((txs) => {
      return txs
    })
  }
  
}

export default GetUtxos
