import React from 'react'
import { string, func, array } from 'prop-types'
//components
import Review from 'components/Review'

const PaymentsList = ({ date, transactions, convertSatoshiToBTC, convertFromBtcToUsd }) => (
  <div className='reviews-list'>
    <div className='reviews-list__date color-light'>{date}</div>
    {transactions.map((transaction, index) =>
      <Review
        key={index}
        convertSatoshiToBTC={convertSatoshiToBTC}
        convertFromBtcToUsd={convertFromBtcToUsd}
        transaction={transaction}
      />)}
  </div>
)

PaymentsList.propTypes = {
  date: string,
  transactions: array,
  convertSatoshiToBTC: func,
  convertFromBtcToUsd: func
}

export default PaymentsList