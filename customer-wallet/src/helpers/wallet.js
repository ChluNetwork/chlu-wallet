import ImportPrivateKey from 'chlu-wallet-support-js/lib/import_private_key'
import fileDownload from 'js-file-download'
import ChluDID from 'chlu-did/src' // TODO: precompiled sources??

export async function generateNewWallet() {
    const importer = new ImportPrivateKey()
    const mnemonic = importer.generateNewMnemonic()
    const chluDid = new ChluDID()
    const did = await chluDid.generateDID()
    return {
        did,
        testnet: true,
        bitcoinMnemonic: mnemonic
    }
}

export async function saveWalletDIDToIPFS(wallet) {

}

export function saveWalletToLocalStorage(wallet) {
    localStorage.setItem('wallet', JSON.stringify(wallet))
}

export function getWalletFromLocalStorage() {
    return JSON.parse(localStorage.getItem('wallet') || 'null')
}

export function downloadWallet(wallet) {
    fileDownload(JSON.stringify(wallet, null, 2), 'chlu_wallet.json')
}

export function importWallet(str) {
    const wallet = JSON.parse(str)
    // TODO: validate fields, handle errors
    return wallet
}

export function getAddress(wallet) {
    const keyPath = "m/44'/1'/0'/0/0"
    const importer = new ImportPrivateKey()
    const kp = importer.importFromMnemonic(wallet.bitcoinMnemonic, keyPath)
    return kp.getAddress()
}