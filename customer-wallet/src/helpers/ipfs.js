import ChluIPFS from 'chlu-ipfs-support'

export async function getChluIPFS(type) {
    const options = { type };
    if (!window.chluIpfs) {
        window.chluIpfs = new ChluIPFS(options);
        await window.chluIpfs.start();
    } else {
        await window.chluIpfs.switchType(options.type);
    }
    return window.chluIpfs;
}

export const types = ChluIPFS.types;