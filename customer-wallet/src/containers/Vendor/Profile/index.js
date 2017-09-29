import React, { Component } from 'react'
import PropTypes from 'prop-types'
// redux
import { connect } from 'react-redux'
// components
import ProfileHeader from './sections/HeaderSection'
import Review from './sections/Review'
import CircularProgress from 'material-ui/CircularProgress'
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
    }).isRequired
  }

  render() {
    const { profile: {
      loading,
      data: { name, rating, titleReviews, titleSold, reviews }
    } } = this.props

    return (
      <div className='page-container profile color-main'>
        {
          loading
            ? <CircularProgress />
            : <div>
              <ProfileHeader name={name} rating={rating} titleReviews={titleReviews} titleSold={titleSold} />
              <div className='section-content'>
                <div className='container'>
                  {Array.isArray(reviews) && reviews.map((review, idx) => (
                    <Review {...review} key={idx} />
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
  profile: store.data.profile
})

export default connect(mapStateToProps)(Profile)
