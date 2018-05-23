import React, { Component } from 'react'
import { shape, func, bool, object, any } from 'prop-types'
// redux
import { connect } from 'react-redux'
import { compose } from 'redux'
import { toggleSearchShow } from 'store/modules/ui/profile'
import { types } from 'helpers/ipfs';
// hoc
import withFxRates from 'containers/Hoc/withFxRates'
import withVendorTransactions from 'containers/Hoc/withVendorTransactions'
import WithChluIPFS from 'containers/Hoc/WithChluIPFS';
// helpers
import { get } from 'lodash'
// components
import ProfileHeader from './sections/HeaderSection'
import Review from './sections/Review'

class Profile extends Component {
  static propTypes = {
    vendorTransaction: shape({
      loading: bool,
      error: any,
      data: object
    }),
    profile: shape({
      loading: bool,
      error: any,
      data: object
    }),
    uiProfile: shape({ isSearchFieldOpen: bool }),
    toggleSearchShow: func,
    convertSatoshiToBTC: func,
    convertFromBtcToUsd: func,
    convertFromUsdToBtc: func
  }

  render() {
    const {
      profile: { data: profileData },
      uiProfile: { isSearchFieldOpen },
      vendorTransaction: { data: vendorTransaction },
      reviews: { reviews },
      toggleSearchShow,
      convertSatoshiToBTC,
      convertSatoshiToBits,
      convertFromBtcToUsd
    } = this.props

    const transactions = get(vendorTransaction, 'txs', [])
    const totals = transactions.reduce((acc, tx) => {
      const review = get(reviews, tx.hash, false)
      if (review) {
        acc.reviewCount++
        if (review.rating > 0) {
          acc.ratingCount++
          acc.ratingSum += review.rating
        }
      }
      acc.bits += convertSatoshiToBits(get(tx, 'total', 0))
      return acc
    }, { bits: 0, ratingCount: 0, ratingSum: 0, reviewCount: 0 })
    const averageRating = totals.ratingSum / totals.ratingCount

    return (
      <div className='page-container profile color-main'>
        <ProfileHeader
          name={get(profileData, 'name')}
          rating={averageRating}
          reviewCount={totals.reviewCount}
          totalBitsSold={totals.bits}
          isSearchFieldOpen={isSearchFieldOpen}
          handleToggleSearchShow={toggleSearchShow}
        />
        <div className='section-content'>
          <div className='container'>
            {transactions.map((tx, idx) => {
              const review = get(reviews, tx.hash, false)
              return <Review
                key={idx}
                convertSatoshiToBTC={convertSatoshiToBTC}
                convertFromBtcToUsd={convertFromBtcToUsd}
                transaction={tx}
                review={review}
              />
            })}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = store => ({
  profile: store.data.profile,
  reviews: store.data.reviews,
  uiProfile: store.ui.profile
})

const mapDispatchToProps = dispatch => ({
  toggleSearchShow: () => dispatch(toggleSearchShow())
})

export default compose(
  WithChluIPFS(types.vendor),
  withFxRates,
  withVendorTransactions,
  connect(mapStateToProps, mapDispatchToProps)
)(Profile)
