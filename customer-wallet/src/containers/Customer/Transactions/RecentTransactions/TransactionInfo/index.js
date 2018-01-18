import React from 'react'
import { string, object, func } from 'prop-types'
// helpers
import { formatCurrency } from 'helpers/currencyFormat'
import get from 'lodash/get'
// styles
import './style.css'

const TransactionInfo = ({ transaction, address, convertSatoshiToBits, ...rest }) => {
  const priceBits = convertSatoshiToBits(get(transaction, 'total', 0))
  const confirmations = get(transaction, 'confirmations', 0)
  const priceBitsFormatted = formatCurrency(priceBits)

  return (
    <div className='transaction__info' {...rest}>
      <div className='field field-address'>
        <div className='field__title'>To</div>
        <div className='field__data'>{address}</div>
      </div>
      <div className='field field-date'>
        <div className='field__title'>Date</div>
        <div className='field__data'>{get(transaction, 'longDate')}</div>
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
      {get(transaction, 'isChluTransaction') || <div className='field-not-chlu'>Not a Chlu transaction</div>}
    </div>
  )
}

TransactionInfo.propTypes = {
  transaction: object,
  address: string,
  convertSatoshiToBits: func
}

export default TransactionInfo
