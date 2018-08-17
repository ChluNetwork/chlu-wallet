import React, { Component } from 'react'
// redux
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { readReviewsIWrote } from 'store/modules/data/reviews'
// components
import Reviews from 'components/Reviews'

class ReviewsIWrote extends Component {

  componentDidMount() {
    this.props.readReviewsIWrote()
  }

  render() {
    const { reviews, editing, loading, error } = this.props

    return <Reviews reviews={reviews} loading={loading} error={error} editing={editing} />
  }

}

const mapStateToProps = state => ({
  reviews: state.data.reviews.reviewsIWrote,
  editing: state.data.reviews.editing,
  loading: state.data.reviews.reviewsIWroteLoading,
  error: state.data.reviews.reviewsIWroteError,
})

const mapDispatchToProps = {
  readReviewsIWrote
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(ReviewsIWrote)