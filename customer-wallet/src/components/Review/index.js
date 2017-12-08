import React from 'react'
import { object, bool, func, string } from 'prop-types'
// components
import ReviewTitle from './ReviewTitle'
// helpers
import { get } from 'lodash'
import { getMonthDateYear } from '../../helpers/Date'
// data
import noProduct from 'images/no-product.png'
// styles
import './style.css'

const ReviewItem = ({
  transaction,
  commentsList = [],
  isMultipleReview,
  convertSatoshiToBTC,
  convertFromBtcToUsd
}) => {
  const BTC = convertSatoshiToBTC(get(transaction, 'total'))
  const USD = convertFromBtcToUsd(BTC)
  const confirmations = get(transaction, 'confirmations')

  return (
    <div className='review-item container-border-bottom'>
      <div className='review-item__avatar'>
        <img src={get(transaction, 'review.productPhoto') || noProduct} alt='avatar' className='avatar'/>
      </div>
      <div className='review-item__info'>
        <div className='info-head-wrapper'>
          <div className='info-head'>
            <div className='info-head__name'>
              {isMultipleReview
                ? 'New Item'
                : get(transaction, 'review.review')
              }
            </div>
            <div className='info-head__date color-light'>
              {!isMultipleReview && <div className='date'>{`${ get(transaction, 'longDate')}`}</div>}
              <div className='platform'>{get(transaction, 'review.platform')}</div>
            </div>
          </div>
          {!isMultipleReview &&
          <div className='info-head__price'>
            <div className='price-item'>{BTC} BTC</div>
            <div className='price-item'>{USD} USD</div>
          </div>
          }
        </div>
        {!isMultipleReview &&
        <div className='review-confirmation'>
          <div className='review-confirmation__title'>Number of confirmations</div>
          <div className={`review-confirmation__amount ${confirmations < 6 ? 'yellow' : 'green'}`}>
            <div>{confirmations}</div>
            <div>{confirmations < 6 ? 'unconfirmed' : 'confirmed'}</div>
          </div>
        </div>
        }
        <div className='review-comments__list'>
          {isMultipleReview
            ? commentsList.map((comment, index) => {
              const parseDate = { ...comment, date: getMonthDateYear(get(comment, 'date', new Date())) }
              return <ReviewTitle {...parseDate} key={index} />
            })
            : <ReviewTitle
              rating={get(transaction, 'review.rating')}
              comment={get(transaction, 'review.comment')}
            />
          }
        </div>
      </div>
    </div>
  )
}

ReviewItem.propTypes = {
  isMultipleReview: bool,
  transaction: object,
  commentsListName: string,
  convertSatoshiToBTC: func,
  convertFromBtcToUsd: func
}

export default ReviewItem
