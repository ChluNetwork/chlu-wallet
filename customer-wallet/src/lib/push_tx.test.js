import PushTx from './push_tx'
jest.mock('./blockchain_client')

test('push raw hex transaction using blockcypher', () => {
  let pusher = new PushTx()
  return pusher.push('randomhash, not so random').then((tx) => {
    expect(tx.test).toBeTruthy()
  })  
})
