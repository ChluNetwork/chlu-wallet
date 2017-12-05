import React from 'react'
import PropTypes from 'prop-types'
// helpers
import Date from 'helpers/Date'
// libs
import { convertSatoshiToBTC } from 'lib/fxRates'
// styles
import './style.css'

const TransactionInfo = ({ address, date, price, isChluTransaction, confirmations, ...rest }) => {
  const parseDate = new Date(date)
  const priceBTC = convertSatoshiToBTC(price)

  return (
    <div className='transaction__info' {...rest}>
      <div className='field field-address'>
        <div className='field__title'>To</div>
        <div className='field__data'>{address}</div>
      </div>
      <div className='field field-date'>
        <div className='field__title'>Date</div>
        <div className='field__data'>
          {`${parseDate.getMonthName()} ${parseDate.getDay()}, ${parseDate.getFullYear()}`}
        </div>
      </div>
      <div className='field field-amount'>
        <div className='field__title '>Amount</div>
        <div className='field__data'>{priceBTC} BTC</div>
      </div>
      <div className='field field-confirm'>
        <div className='field__title'>Number of confirmations</div>
        <div className={`field__data font-weight-bold ${confirmations < 6 ? 'yellow' : 'green'}`}>
          {confirmations}
        </div>
      </div>
      {isChluTransaction || <div className='field-not-chlu'>Not Chlu transaction</div>}
    </div>
  )
}

TransactionInfo.propTypes = {
  address: PropTypes.string,
  date: PropTypes.string,
  price: PropTypes.number,
  isChluTransaction: PropTypes.bool
}

export default TransactionInfo
