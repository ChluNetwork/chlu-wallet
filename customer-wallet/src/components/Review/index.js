import React from 'react'
import { object, string } from 'prop-types'
// components
import { CardContent, CardHeader, Avatar, CardActions } from '@material-ui/core';
import ReviewTitle from './ReviewTitle'
import EditReview from './EditReview'
import StarRatingComponent from 'react-star-rating-component'
// helpers
import { get } from 'lodash'
// data
import noProduct from 'images/no-product.png'
// icons
import ReviewIcon from '@material-ui/icons/Check'

const starCount = 5

const Review = props => {
  const {
    review,
    editing,
    editable
  } = props

  const hasError = Boolean(review.error)

  return <div>
    <CardHeader
      avatar={<Avatar><ReviewIcon/></Avatar>}
      title='Chlu Review'
      subheader={<StarRatingComponent
        name='rating'
        value={review.rating}
        starCount={starCount}
        editing={false}
      />}
    />
    <CardContent>
      {review.review_text || '(No comment left)'}
    </CardContent>
    {editable && review && review.editable
      ? <EditReview multihash={review.multihash} />
      : null
    }
  </div>
    
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
              <div className='date'></div>
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
