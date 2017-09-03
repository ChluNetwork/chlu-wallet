import bitcoin from 'bitcoinjs-lib'
import blocktrailClient from './blocktrail_client'

class CreateChluTransaction {

  constructor() {
    this.blocktrailClient = getBlocktrailClient()
  }
  
  create(toAddress, fromKeyPair, changeAddress, amount, fee, change, inputTx, vin) {
    var txb = new bitcoin.TransactionBuilder(bitcoin.networks.testnet)    
    txb.addOutput(toAddress, amount)
    txb.addOutput(changeAddress, amount - fee)

    txb.addInput(inputTx, vin)    
    txb.sign(0, fromKeyPair)    
  }
  
}
