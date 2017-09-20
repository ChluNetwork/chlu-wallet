import GetUtxos from './get_utxos'
jest.mock('./blockchain_client')

test('load utxos from blocktrail for a given address', () => {
  let getter = new GetUtxos()
  return getter.getFromBlockchain('mjw2BcBvNKkgLvQyYhzRERRgWSUVG7HHTb').then((utxos) => {
    expect(utxos.txrefs.length).toBe(1)
  })  
})
