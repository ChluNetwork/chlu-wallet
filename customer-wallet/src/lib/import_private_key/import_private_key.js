var bip39 = require('bip39')
var bitcoin = require('bitcoinjs-lib')

class ImportPrivateKey {
  
  importFromMnemonic (mnemonic, path) {
    
    const seed = bip39.mnemonicToSeed(mnemonic)    
    let hdNode = bitcoin.HDNode.fromSeedHex(seed, bitcoin.networks.testnet)
    
    for ( let component of this.getPathComponents(path) ) {
      if ( this.isHardened(component) ) {
        hdNode = hdNode.deriveHardened(this.getComponent(component))
      } else {
        hdNode = hdNode.derive(this.getComponent(component))
      }
    }
          
    return {
      keyPair: hdNode,
      address: hdNode.getAddress()
    }
  }
  
  
  getPathComponents (path) {
    if (path[0] !== 'm') {
      throw 'Key specification should start with \'m\''
    }
    const ar = path.split('/')
    return ar.slice(1, ar.length)
  }
    
  isHardened (component)  {
    return component[component.length - 1] === '\''
  }

  getComponent (component) {
    if ( this.isHardened(component) ) {
      return parseInt(component.slice(0, component.length - 1))
    }
    return parseInt(component)
  }  
   
}

export default ImportPrivateKey