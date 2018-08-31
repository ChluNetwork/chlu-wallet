import React, { Component } from 'react'
// redux
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { readReviewsIWrote } from 'store/modules/data/reviewsIWrote'
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
  reviews: state.data.reviewsIWrote.reviews,
  editing: state.data.reviewsIWrote.editing,
  loading: state.data.reviewsIWrote.loading,
  error: state.data.reviewsIWrote.error,
})

const mapDispatchToProps = {
  readReviewsIWrote
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(ReviewsIWrote)