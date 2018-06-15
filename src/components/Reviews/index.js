import React, { Component } from 'react'
// components
import { Grid, Card, CardHeader, Avatar } from '@material-ui/core'
import Review from './Review'
// icons
import LoadingIcon from '@material-ui/icons/Sync'
import ErrorIcon from '@material-ui/icons/Error'
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
    const { classes, reviews, loading } = this.props

    return <Grid container spacing={16} className={classes.root}>
      {loading && <Grid item xs={12}>
        <Card>
          <CardHeader
            avatar={<Avatar><LoadingIcon/></Avatar>}
            title='Fetching reviews...'
          />
        </Card>
      </Grid>}
      {!loading && reviews.map((review, index) => {
        return <Grid key={index} item xs={12} > 
          {review.loading && <Card>
            <CardHeader
              avatar={<Avatar><LoadingIcon/></Avatar>}
              title='Fetching Review from IPFS...'
            />
          </Card>}
          {review.error && <Card>
            <CardHeader
              avatar={<Avatar><ErrorIcon/></Avatar>}
              title='Something went wrong'
              subheader={review.error}
            />
          </Card>}
          {!review.loading && !review.error && <Review review={review} key={reviews.length + index}/>}
        </Grid>
      })}
    </Grid>
  }
}

export default withStyles(styles)(Reviews);
