import React, { Component } from 'react'
// components
import { Button, Grid, Card, CardHeader, Avatar, CircularProgress } from '@material-ui/core'
import Review from 'components/Review'
// icons
import ErrorIcon from '@material-ui/icons/ErrorOutline'
// styles
import { withStyles } from '@material-ui/core/styles'

const styles = {
  root: {
    padding: '20px',
    flexGrow: 1
  },
}

class Reviews extends Component {

  render() {
    const { classes, reviews = [], loading, crawling = false, onLoadMoreReviews, canLoadMore, ...otherProps } = this.props
    const empty = !reviews || !reviews.length

    return <Grid container spacing={16} className={classes.root}>
      {loading && <Grid item xs={12}>
        <Card>
          <CardHeader
            avatar={<CircularProgress/>}
            title='Fetching reviews...'
          />
        </Card>
      </Grid>}

      {!loading && (empty || crawling) && <Grid item xs={12}>
        <Card>
          <CardHeader
            avatar={<ErrorIcon/>}
            title='There is nothing here yet'
            subheader={crawling ? 'Your reviews from other platforms are still being imported. Once done, they will be available to you on this page shortly after.' : 'No reviews to display yet'}
          />
        </Card>
      </Grid>}

      {!loading && !crawling && Array.isArray(reviews) && reviews.map((review, index) => {
        return <Grid key={index} item xs={12} >
          {review.loading && <Card>
            <CardHeader
              avatar={<CircularProgress/>}
              title='Fetching Review...'
            />
          </Card>}
          {review.error && <Card>
            <CardHeader
              avatar={<Avatar><ErrorIcon/></Avatar>}
              title='Something went wrong'
              subheader={review.error}
            />
          </Card>}
          {!review.loading && !review.error && <Review review={review} key={reviews.length + index} {...otherProps} />}
        </Grid>
      })}
      { onLoadMoreReviews && !empty && <Button
          fullWidth
          onClick={onLoadMoreReviews}
          disabled={!canLoadMore || loading}
        >Load More</Button> }
    </Grid>
  }
}

export default withStyles(styles)(Reviews);
