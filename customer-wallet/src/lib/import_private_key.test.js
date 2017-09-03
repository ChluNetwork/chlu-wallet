import ImportPrivateKey from './import_private_key'

test('loading a valid key with a valid path', () => {

  let importer = new ImportPrivateKey()
  
  let mnemonic = "alter ankle cart harvest ecology sign athlete congress desert scare planet love"
  var keyPath = "m/44'/1'/0'/0/0"

  let result = importer.importFromMnemonic(mnemonic, keyPath)

  expect(result.address).toEqual('mjw2BcBvNKkgLvQyYhzRERRgWSUVG7HHTb')
  
})
     
