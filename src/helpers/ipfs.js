import ChluIPFS from 'chlu-ipfs-support'
import { updateReviewRecordAction } from 'store/modules/data/reviews'
import { readMyReputation } from 'store/modules/data/reputation';

export async function getChluIPFS() {
  const isProduction = process.env.NODE_ENV === 'production'
  const defaultNetwork = isProduction ? ChluIPFS.networks.staging : ChluIPFS.networks.experimental
  const options = {
    network: process.env.REACT_APP_CHLU_NETWORK || defaultNetwork,
    bitcoinNetwork: process.env.REACT_APP_BLOCKCYPHER_RESOURCE || 'test3',
    blockCypherApiKey: process.env.REACT_APP_BLOCKCYPHER_TOKEN
  }
  if (!window.chluIpfs) {
    window.chluIpfs = new ChluIPFS(options)
    await window.chluIpfs.start()
    // Turn Review Record updates into redux actions
    window.chluIpfs.events.on('reviewrecord/updated', (multihash, updatedMultihash, reviewRecord) => {
      window.reduxStore.dispatch(updateReviewRecordAction({
        multihash, 
        updatedMultihash,
        reviewRecord
      }))
    })
    // Read my reputation
    window.reduxStore.dispatch(readMyReputation())
  } else {
    await window.chluIpfs.waitUntilReady()
  }
  return window.chluIpfs;
}

export async function readReviews(didId) {
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

