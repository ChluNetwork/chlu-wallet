import ChluIPFS from 'chlu-ipfs-support'

export async function getChluIPFS(options) {
    if (window.chluIpfs) return window.chluIpfs;
    const chluIpfs = new ChluIPFS(options);
    await chluIpfs.start();
    window.chluIpfs = chluIpfs;
    return chluIpfs;
}

export const types = ChluIPFS.types;