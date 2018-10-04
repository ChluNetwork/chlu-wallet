import React, { Component } from 'react'
// components
import Reviews from 'components/Reviews'
import CrawlerStatus from 'containers/CrawlerStatus'
// redux
import { readMyReputation } from 'store/modules/data/reputation'
import { connect } from 'react-redux'

class Reputation extends Component {

  componentDidMount() {
    if (!this.props.loading) this.props.readMyReputation()
  }

  loadMore = () => {
    if (!this.props.loading) this.props.readMyReputation(false)
  }

  render() {
    const { reviews, loading, loadingPage, canLoadMore } = this.props
    return (
      <div>
        <CrawlerStatus />
        <Reviews
          loading={loading && loadingPage === 0}
          reviews={reviews}
          canLoadMore={canLoadMore}
          onLoadMoreReviews={this.loadMore}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  reviews: state.data.reputation.reviews,
  loading: state.data.reputation.loading,
  loadingPage: state.data.reputation.loadingPage,
  canLoadMore: state.data.reputation.canLoadMore
})

const mapDispatchToProps = {
  readMyReputation
}

export default connect(mapStateToProps, mapDispatchToProps)(Reputation)
