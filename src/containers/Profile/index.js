import React, { Component } from 'react'
// Components
import { withStyles, Card, CardContent, Tabs, Tab, LinearProgress } from '@material-ui/core'
import Payment from 'containers/Payment'
import Reviews from 'components/Reviews'
// icons
import ReviewsIcon from '@material-ui/icons/Star'
import PaymentIcon from '@material-ui/icons/AccountBalanceWallet'
import Profile from './Profile';
// helpers
import { get } from 'lodash'
import profileProvider from 'helpers/profileProvider';
// redux
import { compose } from 'recompose';
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { readReputation } from 'store/modules/data/reputation'

const styles = theme => ({
  card: {
    margin: '30px'
  },
  tabsHeader: {
    borderBottom: `1px solid rgba(0,0,0,0.1)`
  }
})

class ProfileContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      profile: {}
    }
  }

  updateProfileAndReviews() {
    const didId = this.props.match.params.id
    if (didId) {
      profileProvider.getProfile(didId).then(profile => this.setState({ profile: profile || {}, loading: false }));
      this.props.readReputation(didId)
    }
  }

  loadMoreReviews = () => {
    const didId = this.props.match.params.id
    if (!this.props.reviewsLoading) {
      this.props.readReputation(didId, false)
    }
  }

  componentDidMount() {
    this.updateProfileAndReviews()
  }

  componentDidUpdate(prevProps) {
    const didId = this.props.match.params.id;
    if (didId !== prevProps.match.params.id) {
      this.setState({ loading: true }, () => this.updateProfileAndReviews())
    }
  }

  handleTabChange = (event, value) => {
    const id = this.props.match.params.id
    const urls = [
      `/profile/${id}`,
      `/profile/${id}/pay`,
    ]
    if (urls[value]) {
      this.props.push(urls[value])
    }
  };

  render() {
    const {
      match,
      classes,
      page = 'reviews',
      reviews,
      reviewsLoading,
      reviewsLoadingPage,
      reviewsDidId,
      canLoadMoreReviews,
      wallet
    } = this.props
    const { profile, loading: loadingProfile } = this.state
    const didId = match.params.id;
    const tabIndex = [
      'reviews',
      'payment'
    ].indexOf(page)
    const myDid = get(wallet, 'did.publicDidDocument.id', null)
    const showProfile = !loadingProfile && profile
    const showPayment = !loadingProfile && myDid && didId !== myDid
    const showReviews = (!reviewsLoading || reviewsLoadingPage > 0) && reviewsDidId === didId
    const loading = !(showProfile && showReviews && showPayment)

    if (loading) {
      return (
        <LinearProgress />
      )
    }

    return (
      <Card className={classes.card}>
        <Profile profile={profile} reviews={reviews} hasMoreReviews={canLoadMoreReviews} />

        <div className={classes.tabsHeader}>
          <Tabs
            value={tabIndex}
            onChange={this.handleTabChange}
            fullWidth
            indicatorColor='secondary'
            textColor='secondary'
            centered
          >
            <Tab icon={<ReviewsIcon className={classes.rightIcon} />} label='Reviews' />
            <Tab icon={<PaymentIcon className={classes.rightIcon} />} label='Send Payment' />
          </Tabs>
        </div>

        <CardContent>
          {this.renderCardContent()}
        </CardContent>
      </Card>
    )
  }

  renderCardContent() {
    const { match, reviews, canLoadMoreReviews, reviewsLoading, reviewsLoadingPage, page = 'profile' } = this.props
    const { profile, loading: loadingProfile } = this.state

    const didId = match.params.id;
    const tabIndex = ['reviews', 'payment'].indexOf(page)

    if (loadingProfile || reviewsLoading || reviewsLoadingPage) {
      return (
        <LinearProgress />
      )
    } else if (tabIndex === 1) {
      return (
        <Payment profile={profile} didId={didId} />
      )
    } else {
      return (
        <Reviews
          reviews={reviews}
          onLoadMoreReviews={this.loadMoreReviews}
          canLoadMore={canLoadMoreReviews}
        />
      )
    }
  }
}

const mapStateToProps = store => {
  return {
    wallet: store.data.wallet,
    reviews: store.data.reputation.reviews,
    reviewsDidId: store.data.reputation.didId,
    reviewsLoading: store.data.reputation.loading,
    reviewsLoadingPage: store.data.reputation.loadingPage,
    reviewsCount: store.data.reputation.count,
    canLoadMoreReviews: store.data.reputation.canLoadMore
  };
};

const mapDispatchToProps = {
  readReputation,
  push
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(ProfileContainer)
