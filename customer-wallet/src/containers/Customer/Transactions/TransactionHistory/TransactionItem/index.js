import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
// libs
import { convertFromBtcToUsd } from 'lib/fxRates'

const TransactionItem = ({ address, price, pathname }) => {
  const priceUsd = convertFromBtcToUsd(price)

  return (
    <div className='transaction-list__item container-border-bottom'>
      <div className='item-head'>
        <div className='item-head__name font-weight-bold'>Address</div>
        <Link to={`${pathname}/${address}`} className='item-head__address'>{address}</Link>
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

TransactionItem.propTypes = {
  address: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  pathname: PropTypes.string.isRequired
}

export default TransactionItem
