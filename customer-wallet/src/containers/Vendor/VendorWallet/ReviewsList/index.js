import React from 'react'
import { string, func, array } from 'prop-types'
import moment from 'moment'
//components
import Review from 'components/Review'

const PaymentsList = ({ date, transactions, reviews, convertSatoshiToBits, convertFromBitsToUsd }) => (
  <div className='reviews-list'>
    <div className='reviews-list__date color-light'>{date}</div>
    {transactions.map((transaction, index) => {
      const date = moment(transaction.received).calendar()
      return <Review
        key={index}
        convertSatoshiToBits={convertSatoshiToBits}
        convertFromBitsToUsd={convertFromBitsToUsd}
        transaction={transaction}
        date={date}
        review={reviews[transaction.hash]}
      />
    })}
  </div>
)

PaymentsList.propTypes = {
  date: string,
  transactions: array,
  convertSatoshiToBits: func,
  convertFromBitsToUsd: func
}

export default PaymentsList