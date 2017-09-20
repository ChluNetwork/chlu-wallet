import CreateChluTransaction from './create_chlu_transaction'
import { sumBy } from 'lodash'

jest.mock('./blockchain_client')

const zoomAddress = "ms4TpM57RWHnEq5PRFtfJ8bcdiXoUE3tfv"
const boomAddress = 'mjw2BcBvNKkgLvQyYhzRERRgWSUVG7HHTb'
const feeRate = 55

test('use coinselect to find transaction inputs', () => {
  let txBuilder = new CreateChluTransaction()
  const targets = [{ address: zoomAddress, value: 1000 }]
  return txBuilder.getInputTxs(boomAddress, targets, feeRate).then(({ inputs, outputs, fee }) => {

    expect(inputs.length).toEqual(1)
    expect(inputs[0].txId).toEqual('b71b74674e5ca38c45bfbd0a84172a991a8e67513902f5ef31c9ca6b00d0527c')
    expect(inputs[0].vout).toEqual(1)
    expect(inputs[0].value).toEqual(181864441)

    expect(outputs.length).toEqual(2)
    expect(outputs[0].address).toEqual(zoomAddress)
    expect(outputs[0].value).toEqual(1000)
    expect(outputs[1].value).toEqual(181851066)

    expect(fee).toEqual(12375)

    expect(fee).toEqual(sumBy(inputs, (o) => o.value)
                        - sumBy(outputs, (o) => o.value))
  })
})


test('create transaction by getting utxo and using coinselect', () => {
  let amount = 1e4
  let txBuilder = new CreateChluTransaction()  
  txBuilder.getImportedKey()
  return txBuilder.create(boomAddress, zoomAddress, amount, null, 'Hello World').then((tx) => {
    expect(tx).not.toBeNull()
    expect(tx.outs[0].value).toEqual(amount)
    expect(tx.outs[1].value).toEqual(181842066)
    expect(tx.outs[2].value).toEqual(0)
  })
})
