import React, { Component } from 'react'
import { get } from 'lodash'
// redux
import { connect } from 'react-redux'
import { compose } from 'recompose'
// components
import Reviews from 'components/Reviews'
// hoc
import withTransactions from 'containers/Hoc/withTransactions'
// helpers
import { getAddress } from 'helpers/wallet'

class ReviewsIWrote extends Component {

  render() {
    const { wallet, reviews, loading, error } = this.props
    const address = getAddress(wallet)

    const transformedReviews = Object.values(reviews)
      .filter(r => r && (r.error || r.loading || r.customer_address === address))

    return <Reviews reviews={transformedReviews} loading={loading} />
  }

}

const mapStateToProps = state => ({
  reviews: state.data.reviews.reviews,
  loading: state.data.transactions.loading,
  error: state.data.transactions.error,
  transactions: get(state, 'data.transactions.data.txs', []),
  wallet: state.data.wallet
})

export default compose(
  connect(mapStateToProps),
  withTransactions
)(ReviewsIWrote)