//import bitcoin from 'bitcoinjs-lib'
import coinSelect from 'coinselect'

// import blocktrailClient from './blocktrail_client'

import ImportPrivateKey from 'lib/import_private_key'
import GetUtxos from 'lib/get_utxos'

import { isEmpty, map, sumBy } from 'lodash'

export default class CreateChluTransaction {

  getImportedKey() {
    const importPrivateKey = new ImportPrivateKey()
    const mnemonic = "alter ankle cart harvest ecology sign athlete congress desert scare planet love"
    const keyPath = "m/44'/1'/0'/0/0"
    this.importedKp = importPrivateKey.importFromMnemonic(mnemonic, keyPath)
    this.feeRate = 55
  }

  getInputTxs(fromAddress, targets, feeRate) {
    const getter = new GetUtxos()
    return getter.getFromBlocktrail(fromAddress).then((utxos) => {
      // let available = sumBy(utxos.data, (tx) => (tx.value))
      // let toSpend = sumBy(targets, (tgt) => (tgt.value))
      // console.log(available)
      // targets.push({ address: fromAddress, value: available - toSpend })

      let unspents = map(utxos.data, (tx) => ({ txId: tx.hash, vout: tx.index, value: tx.value }) )
//      console.log(unspents)
//      console.log(targets)
      let res = coinSelect(unspents, targets, feeRate)
//      console.log(res)
      return res
    })
  }
  
  create(toAddress, fromKeyPair, fromAddress, changeAddress, amount) {
    if ( isEmpty(fromKeyPair) ) {
      fromKeyPair = this.getImportedKey()
    }

    const targets = [
      { address: toAddress, value: amount }
    ]
    
    this.getInputTxs(fromAddress, targets, this.feeRate).then(({ inputs, outputs, fees }) => {
      console.log(inputs)
      console.log(outputs)
      console.log(fees)
    })
    
    // let txb = new bitcoin.TransactionBuilder(bitcoin.networks.testnet)    
    // txb.addOutput(toAddress, amount)
    // txb.addOutput(changeAddress, amount - fee)

    // txb.addInput(inputTx, vin)    
    // txb.sign(0, fromKeyPair)    
  }
  
}
