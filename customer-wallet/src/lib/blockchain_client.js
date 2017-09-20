import blockcypher from 'blockcypher'

export default function getBlockchainClient () {
  return new blockcypher('btc', 'test3', process.env.BLOCKCYPHER_TOKEN)
}
