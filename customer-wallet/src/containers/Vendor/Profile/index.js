import React, { Component } from 'react'
import PropTypes from 'prop-types'
// redux
import { connect } from 'react-redux'
import { toggleSearchShow } from 'store/modules/ui/profile'
// components
import CircularProgress from 'material-ui/CircularProgress'
import ProfileHeader from './sections/HeaderSection'
import Review from './sections/Review'
// styles
import './styles.css'


class Profile extends Component {

  static propTypes = {
    profile: PropTypes.shape({
      name: PropTypes.string,
      rating: PropTypes.number,
      titleReviews: PropTypes.string,
      titleSold: PropTypes.string,
      reviews: PropTypes.array
    }).isRequired,
    uiProfile: PropTypes.shape({ isSearchFieldOpen: PropTypes.bool }),
    toggleSearchShow: PropTypes.func.isRequired
  }

  render() {
    const {
      profile: {
        loading,
        data: { name, rating, titleReviews, titleSold, reviews }
      },
      uiProfile: { isSearchFieldOpen },
      toggleSearchShow
    } = this.props

    return (
      <div className='page-container profile color-main'>
        {
          loading
            ? <CircularProgress />
            : <div>
              <ProfileHeader
                name={name}
                rating={rating}
                titleReviews={titleReviews}
                titleSold={titleSold}
                isSearchFieldOpen={isSearchFieldOpen}
                handleToggleSearchShow={toggleSearchShow}
              />
              <div className='section-content'>
                <div className='container'>
                  {Array.isArray(reviews) && reviews.map((review, idx) => (
                    <Review {...review} key={idx}/>
                  ))}
                </div>
              </div>
            </div>

        }
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
