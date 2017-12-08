import React, { Component } from 'react'
import { shape, func, bool, object, any } from 'prop-types'
// redux
import { connect } from 'react-redux'
import { compose } from 'redux'
import { toggleSearchShow } from 'store/modules/ui/profile'
// hoc
import withFxRates from 'containers/Hoc/withFxRates'
import withVendorTransactions from 'containers/Hoc/withVendorTransactions'
// helpers
import { get } from 'lodash'
// components
import ProfileHeader from './sections/HeaderSection'
import Review from './sections/Review'
// styles
import './styles.css'

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
      toggleSearchShow,
      convertSatoshiToBTC,
      convertFromBtcToUsd
    } = this.props

    return (
      <div className='page-container profile color-main'>
        <ProfileHeader
          name={get(profileData, 'name')}
          rating={get(profileData, 'rating')}
          titleReviews={get(profileData, 'titleReviews')}
          titleSold={get(profileData, 'titleSold')}
          isSearchFieldOpen={isSearchFieldOpen}
          handleToggleSearchShow={toggleSearchShow}
        />
        <div className='section-content'>
          <div className='container'>
            {get(vendorTransaction, 'txs', []).map((transaction, idx) => (
              <Review
                key={idx}
                convertSatoshiToBTC={convertSatoshiToBTC}
                convertFromBtcToUsd={convertFromBtcToUsd}
                transaction={transaction}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = store => ({
  profile: store.data.profile,
  uiProfile: store.ui.profile
})

const mapDispatchToProps = dispatch => ({
  toggleSearchShow: () => dispatch(toggleSearchShow())
})

export default compose(
  withFxRates,
  withVendorTransactions,
  connect(mapStateToProps, mapDispatchToProps)
)(Profile)
