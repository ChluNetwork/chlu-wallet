import ImportPrivateKey from 'chlu-wallet-support-js/lib/import_private_key'
import fileDownload from 'js-file-download'

export function generateNewWallet() {
    const importer = new ImportPrivateKey()
    const mnemonic = importer.generateNewMnemonic()
    // TODO: generate a DID
    return {
        did: {
            id: null,
            privateKeyBase58: null,
        },
        testnet: true,
        bitcoinMnemonic: mnemonic
    }
}

export function saveWalletDIDToIPFS(wallet) {

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
    // TODO: validate fields
    return wallet
}

export function getAddress(wallet) {
    const keyPath = "m/44'/1'/0'/0/0"
    const importer = new ImportPrivateKey()
    const kp = importer.importFromMnemonic(wallet.bitcoinMnemonic, keyPath)
    return kp.getAddress()
}