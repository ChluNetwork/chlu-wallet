import React, { Component } from 'react'
// Components
import { withStyles, Card, CardContent, Tabs, Tab, LinearProgress } from '@material-ui/core'
import Payment from 'containers/Payment'
import Reviews from 'components/Reviews'
// icons
import ProfileIcon from '@material-ui/icons/AccountCircle'
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

const styles = {
  card: {
    margin: '30px'
  }
}
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
      page = 'profile',
      reviews,
      reviewsLoading,
      reviewsLoadingPage,
      reviewsCount,
      reviewsDidId,
      canLoadMoreReviews,
      wallet
    } = this.props
    const { profile, loading: loadingProfile } = this.state
    const didId = match.params.id;
    const tabIndex = [
      'profile',
      'payment'
    ].indexOf(page)
    const myDid = get(wallet, 'did.publicDidDocument.id', null)
    const showProfile = !loadingProfile && profile
    const showPayment = !loadingProfile && myDid && didId !== myDid
    const showReviews = (!reviewsLoading || reviewsLoadingPage > 0) && reviewsDidId === didId
    const loading = !(showProfile && showReviews && showPayment)

    return <Card className={classes.card}>
      <Tabs
        value={tabIndex}
        onChange={this.handleTabChange}
        fullWidth
        indicatorColor='secondary'
        textColor='secondary'
        centered
      >
        <Tab icon={<ProfileIcon className={classes.rightIcon}/>} label='Profile' />
        <Tab icon={<PaymentIcon className={classes.rightIcon}/>} label='Payment' />
      </Tabs>

      <CardContent>
        {this.renderCardContent()}
      </CardContent>
    </Card>
  }

  renderCardContent() {
    const { match, reviews, canLoadMoreReviews, reviewsLoading, reviewsLoadingPage, page = 'profile' } = this.props
    const { profile, loading: loadingProfile } = this.state

    const didId = match.params.id;
    const tabIndex = ['profile', 'payment'].indexOf(page)

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
        <div>
          <Profile profile={profile} reviews={reviews} />

          <Reviews
            reviews={reviews}
            onLoadMoreReviews={this.loadMoreReviews}
            canLoadMore={canLoadMoreReviews}
          />
        </div>
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
