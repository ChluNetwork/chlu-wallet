import React from 'react'
import { string, func, array } from 'prop-types'
//components
import Review from 'components/Review'

const PaymentsList = ({ date, transactions, convertSatoshiToBits, convertFromBitsToUsd }) => (
  <div className='reviews-list'>
    <div className='reviews-list__date color-light'>{date}</div>
    {transactions.map((transaction, index) =>
      <Review
        key={index}
        convertSatoshiToBits={convertSatoshiToBits}
        convertFromBitsToUsd={convertFromBitsToUsd}
        transaction={transaction}
      />)}
  </div>
)

PaymentsList.propTypes = {
  date: string,
  transactions: array,
  convertSatoshiToBits: func,
  convertFromBitsToUsd: func
}

export default PaymentsList