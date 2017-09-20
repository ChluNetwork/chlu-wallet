const mockGetAddr = jest.fn(address => {
  return new Promise ((resolve, reject) => {
    resolve({ address: 'mjw2BcBvNKkgLvQyYhzRERRgWSUVG7HHTb',
              total_received: 182464441,
              total_sent: 600000,
              balance: 181864441,
              unconfirmed_balance: 0,
              final_balance: 181864441,
              n_tx: 4,
              unconfirmed_n_tx: 0,
              final_n_tx: 4,
              txrefs: 
              [ { tx_hash: 'b71b74674e5ca38c45bfbd0a84172a991a8e67513902f5ef31c9ca6b00d0527c',
                  block_height: 1180438,
                  tx_input_n: -1,
                  tx_output_n: 1,
                  value: 181864441,
                  ref_balance: 363928882,
                  spent: false,
                  confirmations: 16256,
                  confirmed: '2017-08-29T10:42:28Z',
                  double_spend: false } ],
              tx_url: 'https://api.blockcypher.com/v1/btc/test3/txs/' })
  })
})


const mockPushTX = jest.fn(txHash => {
  return new Promise ((resolve, reject) => {
    resolve({ test: true })
  })
})

const getBlockchainClient = jest.fn(() => {
  return {
    getAddr: mockGetAddr,
    pushTX: mockPushTX
  }
})

export default getBlockchainClient
