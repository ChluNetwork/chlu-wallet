function getChluNetwork() {
  const isProduction = process.env.NODE_ENV === 'production'
  const defaultNetwork = isProduction ? 'staging' : 'experimental'
  return process.env.REACT_APP_CHLU_NETWORK || defaultNetwork
}

export async function getChluIPFS() {
  const chluApiClient = await getChluAPIClient()
  const did = await chluApiClient.exportDID() // use same did that is in chlu api client
  const options = {
    network: getChluNetwork(),
    bitcoinNetwork: process.env.REACT_APP_BLOCKCYPHER_RESOURCE || 'test3',
    blockCypherApiKey: process.env.REACT_APP_BLOCKCYPHER_TOKEN,
    did,
    OrbitDBIndexName: 'NOOP'
  }
  if (!window.chluIpfs) {
    const ChluIPFS = (await import('chlu-ipfs-support')).default
    window.chluIpfs = new ChluIPFS(options)
    // Resolve DIDs through the API Client. Needed for review publishing
    window.chluIpfs.didIpfsHelper.getDID = (...args) => chluApiClient.didIpfsHelper.getDID(...args)
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
  if (!window.chluApiClient) {
    const ChluAPIClient = (await import('chlu-api-client')).default
    const options = {
      network: getChluNetwork(),
      publishApiUrl: process.env.REACT_APP_CHLU_PUBLISH_URL || 'https://publish.chlu.io',
      queryApiUrl: process.env.REACT_APP_CHLU_QUERY_URL || 'https://query.chlu.io'
    }
    window.chluApiClient = new ChluAPIClient(options)
    await window.chluApiClient.start()
  }
  window.getChluIPFS = getChluIPFS
  return window.chluApiClient;
}