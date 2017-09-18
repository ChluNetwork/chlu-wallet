import ImportPrivateKey from './import_private_key'
import bitcoin from 'bitcoinjs-lib'

test('loading a valid key with a valid path', () => {

  let importer = new ImportPrivateKey()
  
  let mnemonic = "alter ankle cart harvest ecology sign athlete congress desert scare planet love"
  var keyPath = "m/44'/1'/0'/0/0"

  let kp = importer.importFromMnemonic(mnemonic, keyPath)

  expect(kp.getAddress()).toEqual('mjw2BcBvNKkgLvQyYhzRERRgWSUVG7HHTb')
  expect(kp.network).toEqual(bitcoin.networks.testnet)
  
})
     
