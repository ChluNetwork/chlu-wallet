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
import ErrorIcon from '@material-ui/icons/ErrorOutline'

const starCount = 5

const Review = props => {
  const {
    review,
    editing
  } = props

  const hasError = Boolean(review.error)

  if (hasError) {
    return <CardHeader
      avatar={<Avatar><ErrorIcon/></Avatar>}
      title='Chlu Error'
      subheader={review.error}
    />
  } else {
    return <div>
      <CardHeader
        avatar={<Avatar><ReviewIcon/></Avatar>}
        title='Chlu Review'
        subheader={editing === review.multihash
          ? 'Editing in progress...'
          : <StarRatingComponent
            name='rating'
            value={review.rating}
            starCount={starCount}
            editing={false}
          />}
      />
      {editing !== review.multihash && <CardContent>
        {review.review_text || '(No comment left)'}
      </CardContent> }
      {review && review.editable && (!editing || editing === review.multihash)
        ? <EditReview multihash={review.multihash} />
        : null
      }
    </div>
  }
}

Review.propTypes = {
  review: object,
  date: string
}

export default Review
