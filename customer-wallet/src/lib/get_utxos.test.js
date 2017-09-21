import GetUtxos from './get_utxos'
import nock from 'nock'

test('load utxos from blocktrail for a given address', () => {

  nock('https://api.blockcypher.com:443', {"encodedQueryParams":true})
    .get('/v1/btc/test3/addrs/mjw2BcBvNKkgLvQyYhzRERRgWSUVG7HHTb')
    .query({"unspentOnly":"true"})
    .reply(200, {"address":"mjw2BcBvNKkgLvQyYhzRERRgWSUVG7HHTb","total_received":182464441,"total_sent":600000,"balance":181864441,"unconfirmed_balance":0,"final_balance":181864441,"n_tx":4,"unconfirmed_n_tx":0,"final_n_tx":4,"txrefs":[{"tx_hash":"b71b74674e5ca38c45bfbd0a84172a991a8e67513902f5ef31c9ca6b00d0527c","block_height":1180438,"tx_input_n":-1,"tx_output_n":1,"value":181864441,"ref_balance":363928882,"spent":false,"confirmations":19583,"confirmed":"2017-08-29T10:42:28Z","double_spend":false}],"tx_url":"https://api.blockcypher.com/v1/btc/test3/txs/"},
           [ 'Server',
             'nginx/1.13.4',
             'Date',
             'Thu, 21 Sep 2017 20:19:42 GMT',
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
             '98' ])
  
  let getter = new GetUtxos()
  return getter.getFromBlockchain('mjw2BcBvNKkgLvQyYhzRERRgWSUVG7HHTb').then((utxos) => {
    expect(utxos.txrefs.length).toBe(1)
  })  
})
