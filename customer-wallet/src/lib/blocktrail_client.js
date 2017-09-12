import blocktrail from 'blocktrail-sdk'

export default function getBlocktrailClient () {
  return blocktrail.BlocktrailSDK({
    apiKey: process.env.REACT_APP_BLOCKTRAIL_API_KEY,
    apiSecret: process.env.REACT_APP_BLOCKTRAIL_API_SECRET,
    network: 'BTC',
    testnet: true
  })
}
