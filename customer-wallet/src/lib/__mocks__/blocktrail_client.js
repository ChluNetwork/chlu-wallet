const mockAddressUnspentOutputs = jest.fn(address => {
  return new Promise ((resolve, reject) => {
    resolve({ data: 
              [ { hash: 'b71b74674e5ca38c45bfbd0a84172a991a8e67513902f5ef31c9ca6b00d0527c',
                  time: '2017-08-29T10:33:46+0000',
                  confirmations: 15473,
                  is_coinbase: false,
                  value: 181864441,
                  index: 1,
                  address: 'mjw2BcBvNKkgLvQyYhzRERRgWSUVG7HHTb',
                  type: 'pubkeyhash',
                  multisig: null,
                  script: 'OP_DUP OP_HASH160 306dbb831b78797d600093fc17806b524b032c1a OP_EQUALVERIFY OP_CHECKSIG',
                  script_hex: '76a914306dbb831b78797d600093fc17806b524b032c1a88ac' } ],
              current_page: 1,
              per_page: 20,
              total: 1 }
           )
  })
})

const getBlocktrailClient = jest.fn(() => {
  return {
    addressUnspentOutputs: mockAddressUnspentOutputs
  }
})

export default getBlocktrailClient
