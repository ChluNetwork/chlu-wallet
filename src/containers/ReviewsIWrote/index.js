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
    const { wallet, reviews, editing, loading, error } = this.props
    const address = getAddress(wallet)

    const transformedReviews = Object.values(reviews)
      .filter(r => {
        if (!r) return false
        const noData = r.error || r.loading
        const paidByMe = r.customer_address === address
        const issuedByMe = r.issuer && r.issuer === get(wallet, 'did.publicDidDocument.id', null)
        return noData || (issuedByMe && paidByMe)
      })

    return <Reviews reviews={transformedReviews} loading={loading} error={error} editing={editing} />
  }

}

const mapStateToProps = state => ({
  reviews: state.data.reviews.reviews,
  editing: state.data.reviews.editing,
  loading: state.data.transactions.loading,
  error: state.data.transactions.error,
  transactions: get(state, 'data.transactions.data.txs', []),
  wallet: state.data.wallet
})

export default compose(
  connect(mapStateToProps),
  withTransactions
)(ReviewsIWrote)