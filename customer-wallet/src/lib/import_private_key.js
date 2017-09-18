import bip39 from 'bip39'
import bitcoin from 'bitcoinjs-lib'

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
          
    return hdNode.keyPair
  }
  
  
  getPathComponents (path) {
    if (path[0] !== 'm') {
      throw new Error('Key specification should start with \'m\'')
    }
    const ar = path.split('/')
    return ar.slice(1, ar.length)
  }
    
  isHardened (component)  {
    return component[component.length - 1] === '\''
  }

  getComponent (component) {
    if ( this.isHardened(component) ) {
      return parseInt(component.slice(0, component.length - 1), 10)
    }
    return parseInt(component, 10)
  }  
   
}

export default ImportPrivateKey
