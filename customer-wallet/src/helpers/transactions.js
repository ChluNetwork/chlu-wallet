import { getMonthYear, getMonthDateYear } from './Date'
import randomInteger from './randomInteger'
import { get } from 'lodash'
// test data
import { reviews } from '../containers/Vendor/assets/data'

function withTestData (transaction) {
  return {
    ...transaction,
    shortDate: getMonthYear(get(transaction, 'received', new Date())),
    longDate: getMonthDateYear(get(transaction, 'received', new Date())),
    review: reviews[randomInteger(0, reviews.length - 1)]
  }
}

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
  return {
    ...reviews,
    [txHash]: Object.assign(reviews[txHash] || {}, data)
  }
}

export { withTestData, updateTransactions, updateReviewRecord }
