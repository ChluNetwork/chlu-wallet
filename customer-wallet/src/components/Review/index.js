import React from 'react'
import { object, string } from 'prop-types'
// components
import ReviewTitle from './ReviewTitle'
import EditReview from './EditReview'
// helpers
import { get } from 'lodash'
// data
import noProduct from 'images/no-product.png'

const Review = props => {
  const {
    review,
    editing,
    editable,
    date
  } = props

   let status = (<div className='platform'>Unverified</div>)
    if (review.error) {
        status = (<div className='platform'>Invalid</div>)
    } else {
        status = (<div className='platform'>Verified </div>)
    }
    
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
              {status}
            </div>
          </div>
        </div>
        <div className='review-comments__list'>
          {review && editing !== review.multihash
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
        <div className='edit-review'>
          {editable && review && review.editable
            ? <EditReview
              multihash={review.multihash}
            />
            : null
          }
        </div>
      </div>
    </div>
  )
}

Review.propTypes = {
  review: object,
  date: string
}

export default Review
