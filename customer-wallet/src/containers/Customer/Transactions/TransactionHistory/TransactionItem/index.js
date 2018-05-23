import React from 'react'
// libs
import { string, number, func } from 'prop-types'
import { Link } from 'react-router-dom'
// helpers
import { formatCurrency } from 'helpers/currencyFormat'

const TransactionItem = ({ address, price, pathname, convertSatoshiToBits, convertFromBitsToUsd }) => {
  const priceBits = convertSatoshiToBits(price)
  const priceUSD = convertFromBitsToUsd(priceBits)
  const linkPath = `${pathname}/${address}`
  const priceBitsFormatted = formatCurrency(priceBits)
  const priceUSDFormatted = formatCurrency(priceUSD)

  return (
    <div className='transaction-list__item container-border-bottom'>
      <div className='item-head'>
        <div className='item-head__name font-weight-bold'>Address</div>
        <Link to={linkPath} className='item-head__address'>{address}</Link>
      </div>
      <div className='item-price'>
        <div className='item-price__title'>Spent</div>
        <div className='item-price__spent'>
          <div className='price-item'>{priceBitsFormatted} bits</div>
          <div className='price-item'>{priceUSDFormatted} USD</div>
        </div>
      </div>
    </div>
  )
}

TransactionItem.propTypes = {
  address: string,
  price: number,
  pathname: string,
  convertSatoshiToBits: func,
  convertFromBitsToUsd: func
}

export default TransactionItem
