import React from 'react'
import { string, object, func } from 'prop-types'
import moment from 'moment'
// components
import CircularProgress from 'material-ui/CircularProgress'
import Review from 'components/Review'
// helpers
import { formatCurrency } from 'helpers/currencyFormat'
import get from 'lodash/get'
// styles
import './style.css'

const TransactionInfo = props => {
  const {
    transaction,
    address,
    convertSatoshiToBits,
    convertFromBitsToUsd,
    review,
    editing
  } = props
  const priceBits = convertSatoshiToBits(get(transaction, 'total', 0))
  const confirmations = get(transaction, 'confirmations', 0)
  const priceBitsFormatted = formatCurrency(priceBits)
  const date = moment(transaction.received).calendar()
  const reviewIsUpdate = Boolean(review && review.last_version_multihash)
  const reviewDate = reviewIsUpdate ? null : date

  return (
    <div className='transaction__info'>
      <div className='field'>
        <div className='field__title'>Hash</div>
        <div className='field__data'>{transaction.hash}</div>
      </div>
      <div className='field field-address'>
        <div className='field__title'>To</div>
        <div className='field__data'>{address}</div>
      </div>
      <div className='field field-date'>
        <div className='field__title'>Date</div>
        <div className='field__data'>{date}</div>
      </div>
      <div className='field field-amount'>
        <div className='field__title '>Amount</div>
        <div className='field__data'>{priceBitsFormatted} bits</div>
      </div>
      <div className='field field-confirm'>
        <div className='field__title'>Number of confirmations</div>
        <div className={`field__data font-weight-bold ${confirmations < 6 ? 'yellow' : 'green'}`}>
          {confirmations}
        </div>
      </div>
      <div className='review container-border-top container-border-bottom'>
        {
          review ? (
            review.loading
            ? <CircularProgress style={{ display:'block', margin:'auto' }}/>
            : <Review
              convertFromBitsToUsd={convertFromBitsToUsd}
              convertSatoshiToBits={convertSatoshiToBits}
              transaction={transaction}
              date={reviewDate}
              review={review}
              editing={editing}
            />
          ) : <div className='field-not-chlu'>Not a Chlu transaction</div>
        } 
      </div>
    </div>
  )
}

TransactionInfo.propTypes = {
  transaction: object,
  address: string,
  convertSatoshiToBits: func,
  convertFromBitsToUsd: func
}

export default TransactionInfo
