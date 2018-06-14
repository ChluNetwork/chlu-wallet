import React, { Component } from 'react'
// components
import Grid from '@material-ui/core/Grid';
import Review from './Review'
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
    const { classes, reviews } = this.props

    return <Grid container spacing={16} className={classes.root}>
      {reviews.map((review, index) => (
          <Grid key={index} item xs={12} > 
            <Review review={review} />
          </Grid>
        ))}
    </Grid>
  }
}

export default withStyles(styles)(Reviews);
