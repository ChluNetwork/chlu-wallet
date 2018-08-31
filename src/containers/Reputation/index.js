import React, { Component } from 'react'

// components
import Reviews from 'components/Reviews'

// redux
import { readMyReputation } from 'store/modules/data/reputation'
import { pollCrawlerProgress } from 'store/modules/data/crawler'
import { connect } from 'react-redux'

class Reputation extends Component {

  componentDidMount() {
    if (!this.props.loading) this.props.readMyReputation()
    this.props.pollCrawlerProgress()
  }

  loadMore = () => {
    if (!this.props.loading) this.props.readMyReputation(false)
  }

  render() {
    const { reviews, loading, loadingPage, canLoadMore, crawling } = this.props
    return (
      <div>
        <Reviews
          loading={loading && loadingPage === 0}
          reviews={reviews}
          crawling={crawling}
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
  canLoadMore: state.data.reputation.canLoadMore,
  crawling: state.data.crawler.running
})

const mapDispatchToProps = {
  readMyReputation,
  pollCrawlerProgress
}

export default connect(mapStateToProps, mapDispatchToProps)(Reputation)
