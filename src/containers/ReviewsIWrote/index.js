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
  
  loadMore = () => {
    if (!this.props.loading) this.props.readReviewsIWrote(false)
  }

  render() {
    const { reviews, loading, loadingPage, canLoadMore, error } = this.props

    return (<div>
      <Reviews
        reviews={reviews}
        loading={loading && loadingPage === 0}
        error={error}
        canLoadMore={canLoadMore}
        onLoadMoreReviews={this.loadMore}
        showSubjectInfo={true}
      />
    </div>)
  }

}

const mapStateToProps = state => ({
  reviews: state.data.reviewsIWrote.reviews,
  loading: state.data.reviewsIWrote.loading,
  loadingPage: state.data.reviewsIWrote.loadingPage,
  canLoadMore: state.data.reviewsIWrote.canLoadMore,
  error: state.data.reviewsIWrote.error,
})

const mapDispatchToProps = {
  readReviewsIWrote
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(ReviewsIWrote)