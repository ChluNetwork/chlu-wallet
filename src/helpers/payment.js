import CreateChluTransaction from 'chlu-wallet-support-js/lib/create_chlu_transaction';

export async function createTransaction(mnemonic, amount, myAddress, vendorAddress, multihash) {
  const tr = new CreateChluTransaction(process.env.REACT_APP_BLOCKCYPHER_TOKEN)
  tr.getImportedKey(mnemonic)
  const response = await tr.create(myAddress, vendorAddress, amount, null, multihash)
  return {
    tr,
    response,
    pushTransaction: async () => await tr.pushTransaction(response)
  }
}