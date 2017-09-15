import GetUtxos from './get_utxos'
jest.mock('./blocktrail_client')

test('load utxos from blocktrail for a given address', () => {
  let getter = new GetUtxos()
  return getter.getFromBlocktrail('mjw2BcBvNKkgLvQyYhzRERRgWSUVG7HHTb').then((utxos) => {
    expect(utxos.total).toBe(1)
  })
})
