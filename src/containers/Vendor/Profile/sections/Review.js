import React from 'react'
import { string, number, func } from 'prop-types'
// helpers
import { get } from 'lodash'
import { formatCurrency } from 'helpers/currencyFormat'
import moment from 'moment'
// components
import StarRatingComponent from 'react-star-rating-component'

const starCount = 5

const Review = ({ transaction, review, convertSatoshiToBTC, convertFromBtcToUsd, ...rest }) => {
  const totalUSD = convertFromBtcToUsd(convertSatoshiToBTC(get(transaction, 'total')))
  const totalUSDFormatted = formatCurrency(totalUSD)
  const date = moment(transaction.received).calendar()

  return (
    <div className='profile-review container-border-bottom' {...rest}>
      <div className='profile-review__head'>
        <div className='profile-review__info color-light'>
          <div className='info-date'>{date}</div>
          <div className='info-price'>
            $ {totalUSDFormatted}
          </div>
        </div>
        {review ? (review.loading ? '...' : <StarRatingComponent
          name='rate3'
          starCount={starCount}
          value={get(review, 'rating', 0)}
          editing={false}
        />) : null}
      </div>
      <div className='profile-review__description'>
        { review
          ? (
            review.loading
            ? '...' : (
              review.error
              ? <b>{review.error.message || 'Something went wrong'}</b>
              : get(review, 'review_text', '(No comment left)')
            )
          )
          : '(Not a Chlu transaction)'
        }
      </div>
    </div>
  )
}

Review.propTypes = {
  date: string,
  rating: number,
  description: string,
  price: number,
  convertSatoshiToBTC: func,
  convertFromBtcToUsd: func
}

export default Review