import { get, findKey } from 'lodash'

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

function getTxHashByMultihash (reviews, multihash) {
  return findKey(reviews, r => r.multihash === multihash)
}

export { updateTransactions, updateReviewRecord, getTxHashByMultihash }
