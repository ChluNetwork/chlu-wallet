import React, { Component } from 'react'
import { get, flatten } from 'lodash'
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

    let transformedReviews = Object.values(reviews)
      .filter(r => r && (r.error || r.loading || r.customer_address === address))
    transformedReviews = transformedReviews.map(r => ({
        error: r.error || null,
        loading: r.loading || null,
        subject: {
          name: 'Vendor'
        },
        author: {
          name: 'You'
        },
        platform: {
          name: 'Chlu Wallet',
          url: 'https://chlu.io'
        },
        review: {
          text: r.review_text
        },
        rating: {
          min: 1,
          value: r.rating,
          max: 5
        },
        verifiable: true,
        proof: true
      }))

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