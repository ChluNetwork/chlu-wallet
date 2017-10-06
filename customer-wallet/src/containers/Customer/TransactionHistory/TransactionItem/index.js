import React from 'react'
import { Link } from 'react-router'

const TransactionItem = ({ address, price, convertBtcToUsd }) => {
  const priceUsd = convertBtcToUsd(price)

  return (
    <div className='transaction-list__item container-border-bottom'>
      <div className='item-head'>
        <div className='item-head__name font-weight-bold'>Address</div>
        <Link to='#' className='item-head__address'>{address}</Link>
      </div>
      <div className='item-price'>
        <div className='item-price__title'>Spent</div>
        <div className='item-price__spent'>
          <div className='price-item'>{price} BTC</div>
          <div className='price-item'>{priceUsd} USD</div>
        </div>
      </div>
    </div>
  )
}

export default TransactionItem
