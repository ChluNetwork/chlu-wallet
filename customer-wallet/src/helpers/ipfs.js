import ChluIPFS from 'chlu-ipfs-support/src'

export async function getChluIPFS(type) {
    const options = { type }
    if (!window.chluIpfs) {
        window.chluIpfs = new ChluIPFS(options)
        await window.chluIpfs.start()
    } else {
        await window.chluIpfs.switchType(options.type)
    }
    await window.chluIpfs.waitUntilReady()
    return window.chluIpfs;
}

export const types = ChluIPFS.types;