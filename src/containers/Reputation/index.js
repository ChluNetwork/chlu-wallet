import React, { Component } from 'react'
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
    const { reputation, loading } = this.props
    return <div>
      <Reviews
        loading={loading}
        reviews={reputation || []}
      />  
    </div>
  }
}

const mapStateToProps = state => ({
  reputation: state.data.reputation.reputation,
  loading: state.data.loading
})

const mapDispatchToProps = {
  readMyReputation
}

export default connect(mapStateToProps, mapDispatchToProps)(Reputation)