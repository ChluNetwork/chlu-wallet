import PushTx from './push_tx'
import nock from 'nock'

test('push failing raw hex transaction using blockcypher', () => {

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

test('push successfull raw hex transaction using blockcypher', () => {
  
  let rawHex = '01000000017c52d0006bcac931eff5023951678e1a992a17840abdbf458ca35c4e67741bb7010000006b483045022100eb2af9adb74cd4cd265a62ab7a3eab1a12c0340858f79f910e68fa1f46df022302207bea96f24011833808b1f45d8eaf9b55b9b1e334c937bcd92d1be5d70441a8fb01210245e9cf248758fcc4c632298b222ccfb07ddb4e63c4d240ad816f2294774d5ed0ffffffff0310270000000000001976a9147e9eec22ab6336c431bac73b31f0289a06bfccaf88ac92b0d60a000000001976a914306dbb831b78797d600093fc17806b524b032c1a88ac00000000000000000d6a0b48656c6c6f20576f726c6400000000'
  
  nock('https://api.blockcypher.com:443', {"encodedQueryParams":true})
    .post('/v1/btc/test3/txs/push', {"tx":"01000000017c52d0006bcac931eff5023951678e1a992a17840abdbf458ca35c4e67741bb7010000006b483045022100eb2af9adb74cd4cd265a62ab7a3eab1a12c0340858f79f910e68fa1f46df022302207bea96f24011833808b1f45d8eaf9b55b9b1e334c937bcd92d1be5d70441a8fb01210245e9cf248758fcc4c632298b222ccfb07ddb4e63c4d240ad816f2294774d5ed0ffffffff0310270000000000001976a9147e9eec22ab6336c431bac73b31f0289a06bfccaf88ac92b0d60a000000001976a914306dbb831b78797d600093fc17806b524b032c1a88ac00000000000000000d6a0b48656c6c6f20576f726c6400000000"})
    .reply(201, {"tx":{"block_height":-1,"block_index":-1,"hash":"761e29e7faf6ef3fd0b5f69602d4cb266fd48686e6953d4f2d4db60025f88133","addresses":["mjw2BcBvNKkgLvQyYhzRERRgWSUVG7HHTb","ms4TpM57RWHnEq5PRFtfJ8bcdiXoUE3tfv"],"total":181852066,"fees":12375,"size":248,"preference":"low","relayed_by":"212.171.252.165","received":"2017-09-22T05:46:31.125279862Z","ver":1,"double_spend":false,"vin_sz":1,"vout_sz":3,"data_protocol":"unknown","confirmations":0,"inputs":[{"prev_hash":"b71b74674e5ca38c45bfbd0a84172a991a8e67513902f5ef31c9ca6b00d0527c","output_index":1,"script":"483045022100eb2af9adb74cd4cd265a62ab7a3eab1a12c0340858f79f910e68fa1f46df022302207bea96f24011833808b1f45d8eaf9b55b9b1e334c937bcd92d1be5d70441a8fb01210245e9cf248758fcc4c632298b222ccfb07ddb4e63c4d240ad816f2294774d5ed0","output_value":181864441,"sequence":4294967295,"addresses":["mjw2BcBvNKkgLvQyYhzRERRgWSUVG7HHTb"],"script_type":"pay-to-pubkey-hash","age":1180438}],"outputs":[{"value":10000,"script":"76a9147e9eec22ab6336c431bac73b31f0289a06bfccaf88ac","addresses":["ms4TpM57RWHnEq5PRFtfJ8bcdiXoUE3tfv"],"script_type":"pay-to-pubkey-hash"},{"value":181842066,"script":"76a914306dbb831b78797d600093fc17806b524b032c1a88ac","addresses":["mjw2BcBvNKkgLvQyYhzRERRgWSUVG7HHTb"],"script_type":"pay-to-pubkey-hash"},{"value":0,"script":"6a0b48656c6c6f20576f726c64","addresses":null,"script_type":"null-data","data_hex":"48656c6c6f20576f726c64","data_string":"Hello World"}]}},
           [ 'Server',
             'nginx/1.13.4',
             'Date',
             'Fri, 22 Sep 2017 05:46:31 GMT',
             'Content-Type',
             'application/json',
             'Content-Length',
             '1901',
             'Connection',
             'close',
             'Access-Control-Allow-Headers',
             'Origin, X-Requested-With, Content-Type, Accept',
             'Access-Control-Allow-Methods',
             'GET, POST, PUT, DELETE',
             'Access-Control-Allow-Origin',
             '*',
             'X-Ratelimit-Remaining',
             '98' ])
  
  let pusher = new PushTx()
  return pusher.push(rawHex).then((tx) => {
    expect(tx).toEqual({
      "tx": {
        "addresses": [
          "mjw2BcBvNKkgLvQyYhzRERRgWSUVG7HHTb",
          "ms4TpM57RWHnEq5PRFtfJ8bcdiXoUE3tfv"
        ],
        "block_height": -1,
        "block_index": -1,
        "confirmations": 0,
        "data_protocol": "unknown",
        "double_spend": false,
        "fees": 12375,
        "hash": "761e29e7faf6ef3fd0b5f69602d4cb266fd48686e6953d4f2d4db60025f88133",
        "inputs": [
          {
            "addresses": [
              "mjw2BcBvNKkgLvQyYhzRERRgWSUVG7HHTb"
        ],
            "age": 1180438,
            "output_index": 1,
            "output_value": 181864441,
            "prev_hash": "b71b74674e5ca38c45bfbd0a84172a991a8e67513902f5ef31c9ca6b00d0527c",
            "script": "483045022100eb2af9adb74cd4cd265a62ab7a3eab1a12c0340858f79f910e68fa1f46df022302207bea96f24011833808b1f45d8eaf9b55b9b1e334c937bcd92d1be5d70441a8fb01210245e9cf248758fcc4c632298b222ccfb07ddb4e63c4d240ad816f2294774d5ed0",
            "script_type": "pay-to-pubkey-hash",
            "sequence": 4294967295
          }
        ],
        "outputs": [
          {
            "addresses": [
              "ms4TpM57RWHnEq5PRFtfJ8bcdiXoUE3tfv"
            ],
            "script": "76a9147e9eec22ab6336c431bac73b31f0289a06bfccaf88ac",
            "script_type": "pay-to-pubkey-hash",
            "value": 10000
          },
          {
            "addresses": [
              "mjw2BcBvNKkgLvQyYhzRERRgWSUVG7HHTb"
            ],
            "script": "76a914306dbb831b78797d600093fc17806b524b032c1a88ac",
            "script_type": "pay-to-pubkey-hash",
            "value": 181842066
          },
          {
            "addresses": null,
            "data_hex": "48656c6c6f20576f726c64",
            "data_string": "Hello World",
            "script": "6a0b48656c6c6f20576f726c64",
            "script_type": "null-data",
            "value": 0
          }
        ],
        "preference": "low",
        "received": "2017-09-22T05:46:31.125279862Z",
        "relayed_by": "212.171.252.165",
        "size": 248,
        "total": 181852066,
        "ver": 1,
        "vin_sz": 1,
        "vout_sz": 3
      }
    })
  })  
})


