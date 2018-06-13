import ChluIPFS from 'chlu-ipfs-support'
import { updateReviewRecordAction } from 'store/modules/data/reviews'
import { openDB } from 'helpers/reputation/ipfs'

export async function getChluIPFS(type) {
    const options = {
        type,
        network: process.env.NODE_ENV === 'production' ? ChluIPFS.networks.staging : ChluIPFS.networks.experimental,
        bitcoinNetwork: process.env.REACT_APP_BLOCKCYPHER_RESOURCE || 'test3',
        blockCypherApiKey: process.env.REACT_APP_BLOCKCYPHER_TOKEN
    }
    if (!window.chluIpfs) {
        if (!type) {
            throw new Error('Type required')
        }
        window.chluIpfs = new ChluIPFS(options)
        await window.chluIpfs.start()
        // preload reputation db
        await openDB()
        // Turn Review Record updates into redux actions
        window.chluIpfs.instance.events.on('reviewrecord/updated', (multihash, updatedMultihash, reviewRecord) => {
          window.reduxStore.dispatch(updateReviewRecordAction({
            multihash, 
            updatedMultihash,
            reviewRecord
          }))
        })
    } else {
        await window.chluIpfs.waitUntilReady()
        if (type) await window.chluIpfs.switchType(options.type)
    }
    return window.chluIpfs;
}

export const types = ChluIPFS.types;