import React from 'react'
import { string, number, func } from 'prop-types'
import { Link } from 'react-router'

const TransactionItem = ({ address, price, pathname, convertFromBtcToUsd, convertSatoshiToBTC }) => {
  const priceBTC = convertSatoshiToBTC(price)
  const priceUSD = convertFromBtcToUsd(priceBTC)
  const linkPath = `${pathname}/${address}`

  return (
    <div className='transaction-list__item container-border-bottom'>
      <div className='item-head'>
        <div className='item-head__name font-weight-bold'>Address</div>
        <Link to={linkPath} className='item-head__address'>{address}</Link>
      </div>
      <div className='item-price'>
        <div className='item-price__title'>Spent</div>
        <div className='item-price__spent'>
          <div className='price-item'>{priceBTC} BTC</div>
          <div className='price-item'>{priceUSD} USD</div>
        </div>
      </div>
    </div>
  )
}

TransactionItem.propTypes = {
  address: string,
  price: number,
  pathname: string,
  convertFromBtcToUsd: func,
  convertSatoshiToBTC: func
}

export default TransactionItem
