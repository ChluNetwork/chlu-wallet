import React from 'react'
import { get } from 'lodash'
// components
import { CardHeader, Avatar, CardActions, Button } from '@material-ui/core';
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
        subheader={<StarRatingComponent
            name='rating'
            value={get(review, 'rating_details.value', 0)}
            starCount={max}
            editing={false}
          />}
      />
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
