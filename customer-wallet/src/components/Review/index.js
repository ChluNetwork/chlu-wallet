import React from 'react'
import { object, bool, func, string } from 'prop-types'
// components
import ReviewTitle from './ReviewTitle'
// helpers
import { get } from 'lodash'
import { formatCurrency } from 'helpers/currencyFormat'
// data
import noProduct from 'images/no-product.png'
// styles
import './style.css'

const ReviewItem = props => {
  const {
    review,
    transaction,
    date,
    convertSatoshiToBits,
    convertFromBitsToUsd
  } = props
  const Bits = convertSatoshiToBits(get(transaction, 'total'))
  const USD = convertFromBitsToUsd(Bits)
  const BitsFormatted = formatCurrency(Bits)
  const USDFormatted = formatCurrency(USD)

  return (
    <div className='review-item container-border-bottom'>
      <div className='review-item__avatar'>
        <img src={noProduct} alt='avatar' className='avatar'/>
      </div>
      <div className='review-item__info'>
        <div className='info-head-wrapper'>
          <div className='info-head'>
            <div className='info-head__name'>
              {review ? 'Chlu Review' : 'Not a Chlu transaction'}
            </div>
            <div className='info-head__date color-light'>
              <div className='date'>{date || 'Unknown Date'}</div>
              <div className='platform'>{review ? (review.error ? 'Invalid' : 'Unverified') : 'Unverified'}</div>
            </div>
          </div>
          <div className='info-head__price'>
            <div className='price-item'>{BitsFormatted} bits</div>
            <div className='price-item'>{USDFormatted} USD</div>
          </div>
        </div>
        <div className='review-comments__list'>
          {review
            ? (review.error
              ? <b>{review.error.message || 'Something went wrong'}</b>
              : <ReviewTitle
                rating={get(review, 'rating', 0)}
                comment={get(review, 'review_text', '')}
              />
            )
            : null
          }
        </div>
      </div>
    </div>
  )
}

ReviewItem.propTypes = {
  review: object,
  transaction: object,
  date: string,
  convertSatoshiToBits: func,
  convertFromBitsToUsd: func
}

export default ReviewItem
