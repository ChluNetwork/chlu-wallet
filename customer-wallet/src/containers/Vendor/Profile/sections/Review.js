import React from 'react'
import { string, number, func } from 'prop-types'
// helpers
import { get } from 'lodash'
import { formatCurrency } from 'helpers/currencyFormat'
// components
import StarRatingComponent from 'react-star-rating-component'
// styles
import style from 'styles/inlineStyles/containers/Vendor/profile'
// constants
const { ratingStyle } = style

const starCount = 5

const Review = ({ transaction, convertSatoshiToBTC, convertFromBtcToUsd, ...rest }) => {
  const totalUSD = convertFromBtcToUsd(convertSatoshiToBTC(get(transaction, 'total')))
  const totalUSDFormatted = formatCurrency(totalUSD)
  return (
    <div className='profile-review container-border-bottom' {...rest}>
      <div className='profile-review__head'>
        <div className='profile-review__info color-light'>
          <div className='info-date'>{get(transaction, 'longDate')}</div>
          <div className='info-price'>
            $ {totalUSDFormatted}
          </div>
        </div>
        <StarRatingComponent
          {...ratingStyle}
          name='rate3'
          starCount={starCount}
          value={get(transaction, 'review.rating')}
          editing={false}
        />
      </div>
      <div className='profile-review__description'>
        {get(transaction, 'review.comment')}
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
