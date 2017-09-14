import bitcoin from 'bitcoinjs-lib'
// import blocktrailClient from './blocktrail_client'

export default class CreateChluTransaction {
  
  create(toAddress, fromKeyPair, changeAddress, amount, fee, change, inputTx, vin) {
    let txb = new bitcoin.TransactionBuilder(bitcoin.networks.testnet)
    txb.addOutput(toAddress, amount)
    txb.addOutput(changeAddress, amount - fee)

    txb.addInput(inputTx, vin)    
    txb.sign(0, fromKeyPair)    
  }
  
}
