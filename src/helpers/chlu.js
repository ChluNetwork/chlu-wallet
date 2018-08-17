import ChluIPFS from 'chlu-ipfs-support'
import ChluAPIClient from 'chlu-api-client'

function getChluNetwork() {
  const isProduction = process.env.NODE_ENV === 'production'
  const defaultNetwork = isProduction ? ChluIPFS.networks.staging : ChluIPFS.networks.experimental
  return process.env.REACT_APP_CHLU_NETWORK || defaultNetwork
}

async function getDIDFromChluAPIClient() {
  const chluApiClient = await getChluAPIClient()
  return await chluApiClient.exportDID()
}

export async function getChluIPFS() {
  const did = await getDIDFromChluAPIClient() // use same did that is in chlu api client
  const options = {
    network: getChluNetwork(),
    bitcoinNetwork: process.env.REACT_APP_BLOCKCYPHER_RESOURCE || 'test3',
    blockCypherApiKey: process.env.REACT_APP_BLOCKCYPHER_TOKEN,
    did
  }
  if (!window.chluIpfs) {
    window.chluIpfs = new ChluIPFS(options)
    await window.chluIpfs.start()
  } else {
    await window.chluIpfs.waitUntilReady()
    if (window.chluIpfs.didIpfsHelper.didId !== did.publicDidDocument.id) {
      await window.chluIpfs.importDID(did)
    }
  }
  return window.chluIpfs;
}

export async function getChluAPIClient() {
  const options = {
    network: getChluNetwork(),
    publishApiUrl: process.env.REACT_APP_CHLU_PUBLISH_API_URL || 'https://publish.chlu.io',
    queryApiUrl: process.env.REACT_APP_CHLU_QUERY_API_URL || 'https://query.chlu.io'
  }
  if (!window.chluApiClient) {
    window.chluApiClient = new ChluAPIClient(options)
    await window.chluApiClient.start()
  }
  return window.chluApiClient;
}

export async function readReviews(didId) {
  // TODO: replace this with API Client call
  const chluIpfs = await getChluIPFS()
  const multihashes = await chluIpfs.getReviewsByDID(didId)
  const reviews = []
  for (const multihash of multihashes) {
    // TODO: show them as loading and dispatch redux actions to resolve them
    reviews.push(await chluIpfs.readReviewRecord(multihash))
  }
  return reviews
}

export async function importUnverifiedReviews(reviews) {
  const chluIpfs = await getChluIPFS()
  return await chluIpfs.importUnverifiedReviews(reviews.map(r => {
    r.chlu_version = 0
    // set this to myself so that it gets indexed right in Chlu
    r.subject.did = chluIpfs.didIpfsHelper.didId
    return r
  }))
}

