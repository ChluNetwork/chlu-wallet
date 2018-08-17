import { get, reduce, includes } from 'lodash'

function updateTransactions (txs, transaction) {
  const isConfirmations = txs.find((item) => get(item, 'hash', 'old') === get(transaction, 'hash', 'new'))

  if (isConfirmations) {
    return txs.map((item) => {
      if (get(item, 'hash', 'old') === get(transaction, 'hash', 'new')) {
        return transaction
      }

      return item
    })
  }

  return [ transaction, ...txs ]
}

function updateReviewRecord (reviews, txHash, data) {
  if (txHash) {
    return {
      ...reviews,
      [txHash]: Object.assign(reviews[txHash] || {}, data)
    }
  } else {
    return reviews
  }
}

function calculateTotalSpentFromTransactions (transactions, address) {
  let result = 0
  result = reduce(transactions, (acc, tx) => {
    return acc + calculateTotalSpent(tx, address)
  }, 0)
  return result
}

function calculateTotalSpent (transaction, address) {

  let result = 0
    
  result = reduce(transaction.outputs, (accumulator, output) => {
    let sum = 0
    if (includes(output.addresses, address)) {
      sum = sum + output.value
    }
    return accumulator + sum
  }, 0)
    
    
  return result
}


export {
  updateTransactions,
  updateReviewRecord,
  calculateTotalSpent,
  calculateTotalSpentFromTransactions
}
