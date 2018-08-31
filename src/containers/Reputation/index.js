import React, { Component } from 'react'
import { isEmpty } from 'lodash'

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

  render() {
    const { reviews, loading, crawling } = this.props
    const reviewList = isEmpty(reviews) ? [] : Object.values(reviews)

    return (
      <div>
        <Reviews loading={loading} reviews={reviewList} crawling={crawling} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  reviews: state.data.reputation.reviews,
  loading: state.data.reputation.loading,
  crawling: state.data.crawler.running
})

const mapDispatchToProps = {
  readMyReputation,
  pollCrawlerProgress
}

export default connect(mapStateToProps, mapDispatchToProps)(Reputation)
