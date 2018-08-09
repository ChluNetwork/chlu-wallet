
[![Build Status](https://travis-ci.org/ChluNetwork/chlu-wallet.svg?branch=master)](https://travis-ci.org/ChluNetwork/chlu-wallet)

## What is Chlu?

Chlu is a decentralised reputation system.

Vendor reputation is backed by payments received via cryptocurrencies.

Vendors completely control who can access their reputation data, and
marketplaces can not limit access to a vendor's data.

Chlu supports payments with any cryptocurrencies as long there are
wallets for that cryptocurrency with support for Chlu.

### How does Chlu work?

Chlu enables paying customers to leave reviews and ratings for
vendors. The reviews and ratings are saved on IPFS and vendors remain
in complete control of their reputation data. Vendors can choose to
publicly share them with anyone, or selectively share them with
marketplaces where they sell their services and products.

The position paper on https://chlu.io has more details.

### Who runs Chlu?

Short answer - no one. But there is a team developing the protocols
and reference open source implementations of the wallets and services.

There is no smart contract that any one organisation controls.

## What are Chlu protocols?

Chlu requires customer and vendor wallets to provide functionality
that enables customers and vendors to leave reviews, edit them later
and share them if they want to.

The Chlu protocol specifies the behaviours that wallet providers need
to build to provide support for Chlu reputation on their wallet. The
protocol specifies the format of messages and when and how the
messages are to be exchanged, where the data is to be saved and how
this data should be interpreted by wallets.

## Can anyone create a wallet?

Yes, any wallet can support the Chlu reputation platform by providing
support for the Chlu protocols specified in this repository.

## Contribution

To contribute to our reference open source implementation of wallets,
please create an issue in this repository and/or a pull request with
associated changes.

To make suggestions for improving the Chlu protocol, please go to our
[protocol repository](https://github.com/ChluNetwork/chlu-protocol)

## Install

The customer wallet was setup using create-react-app

- `cd customer-wallet`
- copy `.env.example` to create a `.env` file. Fill in the API keys for blockcypher. We will eventually move off blockcypher, but for now we are using a third part API to push transactions
- `yarn` to install dependencies
- `yarn start` to run a development server
- `yarn build` to make a production build

_Note: `yarn start` may throw module resolution errors on Windows. To work around this issue, `yarn xstart` can be used instead. This requires the `cross-env` package installed globally on the developer machine._

## Test & Demo

### Set up marketplace

To work, the Demo requires a Chlu marketplace instance.

- clone and configure [chlu-marketplace-js](https://github.com/ChluNetwork/chlu-marketplace-js)
- in the config file, set it for example on port `4000` and set up the marketplace URL to `http://localhost:4000`
- make sure it is reachable using a command like `curl http://localhost:4000`
- run `node src/bin/ setup-vendor -u http://localhost:4000` to set up a test vendor on your marketplace
- if there were no errors, try running `curl http://localhost:4000/vendors` and you should get an array with one string, that's your vendor ID. Copy it
- set that vendor ID as the `REACT_APP_VENDOR_ID` variable in your `.env`
- set the `REACT_APP_MARKETPLACE_URL` variable in your `.env` to `http://localhost:4000` which is your marketplace URL.

__Note:__ make sure your marketplace is running on the same chlu network as the Demo.

By default, in development, the demo runs on experimental but the marketplace binary runs on staging.

Add this to your `config.json` for the marketplace:

```json
"chluIpfs": {
    "network": "experimental"
}
```

Your marketplace should now run on the `experimental` network, like the demo does in development.

### Customer wallet

Use mnemonic `alter ankle cart harvest ecology sign athlete congress desert scare planet love` and you should get the address
`mjw2BcBvNKkgLvQyYhzRERRgWSUVG7HHTb`.

That wallet has some BTC on testnet, so feel free to use a bit of it ;)

Here is a file you can use to login as that user. Download it as json as use it to login in the
wallet: https://ipfs.io/ipfs/QmUEaLad9udhbkm3G2qRUGUhxGtiRtbArHssE65VoqhdP5

### Vendor demo address

Use the address `ms4TpM57RWHnEq5PRFtfJ8bcdiXoUE3tfv` to send payments to. It has some reviews already there.

If you want to build your own wallet or integrate Chlu into your
project, check out the libraries used by the demo:

- [chlu-ipfs-support](https://github.com/ChluNetwork/chlu-ipfs-support)
- [chlu-wallet-support-js](https://github.com/ChluNetwork/chlu-wallet-support-js)

The libraries are still in development
