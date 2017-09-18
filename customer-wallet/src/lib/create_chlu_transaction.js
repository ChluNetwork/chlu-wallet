import bitcoin from 'bitcoinjs-lib'
import coinSelect from 'coinselect'

// import blocktrailClient from './blocktrail_client'

import ImportPrivateKey from 'lib/import_private_key'
import GetUtxos from 'lib/get_utxos'

import { isEmpty, map, forEach } from 'lodash'

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
      let unspents = map(utxos.data, (tx) => ({ txId: tx.hash, vout: tx.index, value: tx.value }) )
      let { inputs, outputs, fee } = coinSelect(unspents, targets, feeRate)
      return { inputs, outputs, fee }
    })
  }
  
  create(fromAddress, toAddress, amount, changeAddress) {
    if ( isEmpty(this.importedKp) ) {
      throw new Error('No key pair specified')
    }

    changeAddress = isEmpty(changeAddress) ? fromAddress : changeAddress

    const targets = [
      { address: toAddress, value: amount }
    ]
    
    return this.getInputTxs(fromAddress, targets, this.feeRate).then(({ inputs, outputs, fees }) => {
      let txb = new bitcoin.TransactionBuilder(bitcoin.networks.testnet)

      forEach(outputs, (o) => {
        if ( !isEmpty(o.address) ) {
          txb.addOutput(o.address, o.value)
        } else {
          txb.addOutput(changeAddress, o.value)
        }
      })

      // only one input allowed for now
      txb.addInput(inputs[0].txId, inputs[0].vout)
      txb.sign(0, this.importedKp)
      return txb
    })
  }
}
