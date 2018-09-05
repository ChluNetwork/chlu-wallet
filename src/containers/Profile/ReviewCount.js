import React, { Component } from 'react'
import { withStyles } from '@material-ui/core'
import CheckIcon from '@material-ui/icons/CheckCircle'

const styles = theme => ({
  reviewCount: {
    color: 'rgb(15,155,15)',
    fontSize: 14,
    fontWeight: 500,
    display: 'inline-block',
    paddingLeft: theme.spacing.unit * 2
  },
  reviewCountUnverified: {
    color: 'rgba(0,0,0,0.5)',
    fontSize: 14,
    display: 'inline-block',
    paddingLeft: theme.spacing.unit * 2
  },
  reviewCountVerifiedIcon: {
    height: 16,
    width: 16,
    margin: 0,
    marginTop: -2,
    verticalAlign: 'middle'
  },
  reviewCountTotal: {
    color: 'rgba(0,0,0,0.5)',
    fontSize: 14,
    fontWeight: 100
  }
});

class ReviewCount extends Component {
  render() {
    const { classes, reviews } = this.props
    const reviewsCount = reviews.length
    const verifiedReviewsCount = reviews.filter(review => review.verifiable).length

    if (reviewsCount > 0) {
      if (verifiedReviewsCount > 0) {
        if (reviewsCount > verifiedReviewsCount) {
          return (
            <span className={classes.reviewCount} ref={span => this.verifiedReviewCounterElem = span}>
              <CheckIcon className={classes.reviewCountVerifiedIcon} /> {verifiedReviewsCount} verifiable {this.reviewsText(verifiedReviewsCount)} <span className={classes.reviewCountTotal}>({reviewsCount} total)</span>
            </span>
          )
        } else {
          return (
            <span className={classes.reviewCount} ref={span => this.verifiedReviewCounterElem = span}>
              <CheckIcon className={classes.reviewCountVerifiedIcon} /> {verifiedReviewsCount} verifiable {this.reviewsText(verifiedReviewsCount)}
            </span>
          )
        }
      } else {
        return (
          <span className={classes.reviewCountUnverified}>
            {reviewsCount} {reviewsCount === 1 ? 'review' : 'reviews'}
          </span>
        )
      }
    } else {
      return (
        <span className={classes.reviewCountUnverified}>
          No reviews yet
        </span>
      )
    }
  }

  componentDidMount() {
    if (this.verifiedReviewCounterElem && this.verifiedReviewCounterElem.animate) {
      this.verifiedReviewCounterElem.animate(
        [
          { transform: 'scale(0)' },
          { transform: 'scale(1.3)' },
          { transform: 'scale(1)' }
        ],
        {
          duration: 900,
          easing: 'cubic-bezier(0.6,0,0,1)',
          delay: 600,
          fill: 'backwards'
        }
      )
    }
  }

  reviewsText(count) {
    return count === 1 ? 'review' : 'reviews'
  }
}

export default withStyles(styles)(ReviewCount)
