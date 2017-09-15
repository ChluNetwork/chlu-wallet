import CreateChluTransaction from './create_chlu_transaction'

const zoomAddress = "ms4TpM57RWHnEq5PRFtfJ8bcdiXoUE3tfv"
const boomAddress = 'mjw2BcBvNKkgLvQyYhzRERRgWSUVG7HHTb'
const feeRate = 55

test('use coinselect to find transaction inputs', () => {
  let txBuilder = new CreateChluTransaction()
  const targets = [{ address: zoomAddress, value: 1e8 }]
  return txBuilder.getInputTxs(boomAddress, targets, feeRate).then((inputs, outputs, fees) => {
    console.log(inputs)
    console.log(outputs)
    console.log(fees)
  })
})


// test('create transaction by getting utxo and using coinselect', () => {
//   let txBuilder = new CreateChluTransaction()
//   return txBuilder.getInputTxs('mjw2BcBvNKkgLvQyYhzRERRgWSUVG7HHTb', null, '', null, 1).then((utxos) => {
//     expect(utxos.total).toBe(4)
//   })
// })
