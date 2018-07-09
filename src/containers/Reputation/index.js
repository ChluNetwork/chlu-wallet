import React, { Component } from 'react'
import { isEmpty } from 'lodash'
// components
import Reviews from 'components/Reviews'
// redux
import { readMyReputation } from 'store/modules/data/reputation'
import { connect } from 'react-redux'

class Reputation extends Component {

  componentDidMount() {
    if (!this.props.loading) this.props.readMyReputation()
  }

  render() {
    const { reviews, loading } = this.props
    const reviewList = isEmpty(reviews) ? [] : Object.values(reviews)
    console.log(reviewList)
    return <div>
      <Reviews
        loading={loading}
        reviews={reviewList}
      />  
    </div>
  }
}

const mapStateToProps = state => ({
  reviews: state.data.reputation.reviews,
  loading: state.data.loading
})

const mapDispatchToProps = {
  readMyReputation
}

export default connect(mapStateToProps, mapDispatchToProps)(Reputation)