import PushTx from './push_tx'
import nock from 'nock'

test('push raw hex transaction using blockcypher', () => {

  nock('https://api.blockcypher.com:443', {"encodedQueryParams":true})
    .post('/v1/btc/test3/txs/push', {"tx":"randomhash, not so random"})
    .reply(400, {"error":"Couldn't decode hex: randomhash, not so random"},
           [ 'Server',
             'nginx/1.13.4',
             'Date',
             'Thu, 21 Sep 2017 20:21:03 GMT',
             'Content-Type',
             'application/json',
             'Content-Length',
             '59',
             'Connection',
             'close',
             'Access-Control-Allow-Headers',
             'Origin, X-Requested-With, Content-Type, Accept',
             'Access-Control-Allow-Methods',
             'GET, POST, PUT, DELETE',
             'Access-Control-Allow-Origin',
             '*',
             'X-Ratelimit-Remaining',
             '97' ])
  
  let pusher = new PushTx()
  return pusher.push('randomhash, not so random').catch((tx) => {
    expect(tx).toEqual('Couldn\'t decode hex: randomhash, not so random')
  })  
})
