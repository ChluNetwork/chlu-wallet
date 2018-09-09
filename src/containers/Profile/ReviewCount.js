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
    const count = reviews ? reviews.length : 0
    const verifiableCount = reviews ? reviews.filter(review => review.verifiable).length : 0

    if (count > 0) {
      if (verifiableCount > 0) {
        return (
          <span className={classes.reviewCount} ref={span => this.verifiedReviewCounterElem = span}>
            <CheckIcon className={classes.reviewCountVerifiedIcon} /> {this.verifiableCountText(verifiableCount)} {this.totalCountText(count, verifiableCount)}
          </span>
        )
      } else {
        return (
          <span className={classes.reviewCountUnverified}>
            {this.countText(count)}
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

  verifiableCountText(verifiableCount) {
    const { hasMoreReviews } = this.props

    if (hasMoreReviews) {
      if (verifiableCount === 1) {
        return 'More than 1 verifiable review'
      } else {
        return `More than ${verifiableCount} verifiable reviews`
      }
    } else {
      if (verifiableCount === 1) {
        return '1 verifiable review'
      } else {
        return `${verifiableCount} verifiable reviews`
      }
    }
  }

  countText(count) {
    const { hasMoreReviews } = this.props

    if (hasMoreReviews) {
      if (count === 1) {
        return 'More than 1 review'
      } else {
        return `More than ${count} reviews`
      }
    } else {
      if (count === 1) {
        return '1 review'
      } else {
        return `${count} reviews`
      }
    }
  }

  totalCountText(count, verifiedCount) {
    const { classes } = this.props

    if (count > verifiedCount) {
      if (this.props.hasMoreReviews) {
        return (
          <span className={classes.reviewCountTotal}>
            (more than {count} total)
          </span>
        )
      } else {
        return (
          <span className={classes.reviewCountTotal}>
            ({count} total)
          </span>
        )
      }
    }
  }
}

export default withStyles(styles)(ReviewCount)
