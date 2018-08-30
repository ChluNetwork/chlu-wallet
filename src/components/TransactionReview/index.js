import React from 'react'
import { get } from 'lodash'
// components
import { CardContent, CardHeader, Avatar, CardActions, Button } from '@material-ui/core';
import EditReview from 'components/EditReview'
import StarRatingComponent from 'react-star-rating-component'
// icons
import ReviewIcon from '@material-ui/icons/Check'
import ErrorIcon from '@material-ui/icons/ErrorOutline'
// redux
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

const starCount = 5

const Review = props => {
  const {
    review,
    editing,
    push
  } = props

  const hasError = Boolean(review.error)

  if (hasError) {
    return <CardHeader
      avatar={<Avatar><ErrorIcon/></Avatar>}
      title='Chlu Error'
      subheader={review.error}
    />
  } else {
    const maxStars = get(review, 'rating_details.max', starCount)
    const max = maxStars > 0 ? maxStars : starCount
    return <div>
      <CardHeader
        avatar={<Avatar><ReviewIcon/></Avatar>}
        title='Chlu Review'
        subheader={editing === review.multihash
          ? 'Editing in progress...'
          : <StarRatingComponent
            name='rating'
            value={get(review, 'rating_details.value', 0)}
            starCount={max}
            editing={false}
          />}
      />
      {editing !== review.multihash && <CardContent>
        {get(review, 'review.text', '(No comment left)')}
      </CardContent> }
      {review && review.editable && (!editing || editing === review.multihash)
        ? <EditReview multihash={review.multihash} />
        : null
      }
      <CardActions>
        <Button onClick={() => push(`/review/${review.multihash}`)}>View More</Button>
      </CardActions>
    </div>
  }
}

const mapDispatchToProps = {
  push
}

export default connect(null, mapDispatchToProps)(Review)
