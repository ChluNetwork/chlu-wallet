import ChluIPFS from 'chlu-ipfs-support'
import { updateReviewRecordAction } from 'store/modules/data/reviews'

export async function getChluIPFS(type) {
    const options = { type }
    if (!window.chluIpfs) {
        if (!type) {
            throw new Error('Type required')
        }
        window.chluIpfs = new ChluIPFS(options)
        await window.chluIpfs.start()
        // Turn Review Record updates into redux actions
        window.chluIpfs.instance.events.on('updated ReviewRecord', (multihash, updatedMultihash, reviewRecord) => {
          reviewRecord.editable = reviewRecord.orbitDb === window.chluIpfs.getOrbitDBAddress()
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