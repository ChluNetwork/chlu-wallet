import blocktrail from 'blocktrail-sdk'

export default function getBlocktrailClient () {
  return blocktrail.BlocktrailSDK({
    apiKey: process.env.BLOCKTRAIL_API_KEY,
    apiSecret: process.env.BLOCKTRAIL_API_SECRET,
    network: 'BTC',
    testnet: true
  })
}
