import CreateChluTransaction from './create_chlu_transaction'
import { sumBy } from 'lodash'
import nock from 'nock'

const zoomAddress = "ms4TpM57RWHnEq5PRFtfJ8bcdiXoUE3tfv"
const boomAddress = 'mjw2BcBvNKkgLvQyYhzRERRgWSUVG7HHTb'
const feeRate = 55

test('use coinselect to find transaction inputs', () => {

  nock('https://api.blockcypher.com:443', {"encodedQueryParams":true})
    .get('/v1/btc/test3/addrs/mjw2BcBvNKkgLvQyYhzRERRgWSUVG7HHTb')
    .query({"unspentOnly":"true"})
    .reply(200, {"address":"mjw2BcBvNKkgLvQyYhzRERRgWSUVG7HHTb","total_received":182464441,"total_sent":600000,"balance":181864441,"unconfirmed_balance":0,"final_balance":181864441,"n_tx":4,"unconfirmed_n_tx":0,"final_n_tx":4,"txrefs":[{"tx_hash":"b71b74674e5ca38c45bfbd0a84172a991a8e67513902f5ef31c9ca6b00d0527c","block_height":1180438,"tx_input_n":-1,"tx_output_n":1,"value":181864441,"ref_balance":363928882,"spent":false,"confirmations":19598,"confirmed":"2017-08-29T10:42:28Z","double_spend":false}],"tx_url":"https://api.blockcypher.com/v1/btc/test3/txs/"},
           [ 'Server',
             'nginx/1.13.4',
             'Date',
             'Thu, 21 Sep 2017 20:33:17 GMT',
             'Content-Type',
             'application/json',
             'Content-Length',
             '684',
             'Connection',
             'close',
             'Access-Control-Allow-Headers',
             'Origin, X-Requested-With, Content-Type, Accept',
             'Access-Control-Allow-Methods',
             'GET, POST, PUT, DELETE',
             'Access-Control-Allow-Origin',
             '*',
             'X-Ratelimit-Remaining',
             '93' ])  
  let txBuilder = new CreateChluTransaction()
  const targets = [{ address: zoomAddress, value: 1000 }]
  return txBuilder.getInputTxs(boomAddress, targets, feeRate).then(({ inputs, outputs, fee }) => {

    expect(inputs.length).toEqual(1)
    expect(inputs[0].txId).toEqual('b71b74674e5ca38c45bfbd0a84172a991a8e67513902f5ef31c9ca6b00d0527c')
    expect(inputs[0].vout).toEqual(1)
    expect(inputs[0].value).toEqual(181864441)

    expect(outputs.length).toEqual(2)
    expect(outputs[0].address).toEqual(zoomAddress)
    expect(outputs[0].value).toEqual(1000)
    expect(outputs[1].value).toEqual(181851066)

    expect(fee).toEqual(12375)

    expect(fee).toEqual(sumBy(inputs, (o) => o.value)
                        - sumBy(outputs, (o) => o.value))
  })
})


test('create transaction by getting utxo and using coinselect', () => {

  nock('https://api.blockcypher.com:443', {"encodedQueryParams":true})
    .get('/v1/btc/test3/addrs/mjw2BcBvNKkgLvQyYhzRERRgWSUVG7HHTb')
    .query({"unspentOnly":"true"})
    .reply(200, {"address":"mjw2BcBvNKkgLvQyYhzRERRgWSUVG7HHTb","total_received":182464441,"total_sent":600000,"balance":181864441,"unconfirmed_balance":0,"final_balance":181864441,"n_tx":4,"unconfirmed_n_tx":0,"final_n_tx":4,"txrefs":[{"tx_hash":"b71b74674e5ca38c45bfbd0a84172a991a8e67513902f5ef31c9ca6b00d0527c","block_height":1180438,"tx_input_n":-1,"tx_output_n":1,"value":181864441,"ref_balance":363928882,"spent":false,"confirmations":19600,"confirmed":"2017-08-29T10:42:28Z","double_spend":false}],"tx_url":"https://api.blockcypher.com/v1/btc/test3/txs/"},
           [ 'Server',
             'nginx/1.13.4',
             'Date',
             'Thu, 21 Sep 2017 20:35:08 GMT',
             'Content-Type',
             'application/json',
             'Content-Length',
             '684',
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
  
  let amount = 1e4
  let txBuilder = new CreateChluTransaction()  
  txBuilder.getImportedKey()
  return txBuilder.create(boomAddress, zoomAddress, amount, null, 'Hello World').then((tx) => {
    expect(tx).not.toBeNull()
    expect(tx.outs[0].value).toEqual(amount)
    expect(tx.outs[1].value).toEqual(181842066)
    expect(tx.outs[2].value).toEqual(0)
    expect(tx.toHex()).toEqual('01000000017c52d0006bcac931eff5023951678e1a992a17840abdbf458ca35c4e67741bb7010000006b483045022100eb2af9adb74cd4cd265a62ab7a3eab1a12c0340858f79f910e68fa1f46df022302207bea96f24011833808b1f45d8eaf9b55b9b1e334c937bcd92d1be5d70441a8fb01210245e9cf248758fcc4c632298b222ccfb07ddb4e63c4d240ad816f2294774d5ed0ffffffff0310270000000000001976a9147e9eec22ab6336c431bac73b31f0289a06bfccaf88ac92b0d60a000000001976a914306dbb831b78797d600093fc17806b524b032c1a88ac00000000000000000d6a0b48656c6c6f20576f726c6400000000')
  })
})
