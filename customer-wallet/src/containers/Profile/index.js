import React, { Component } from 'react'
import PropTypes from 'prop-types'
// redux
import { connect } from 'react-redux'
import { getProfile } from 'store/modules/data/profile'
// components
import ProfileHeader from './sections/HeaderSection'
import Review from './sections/Review'
// styles
import './styles.css'

class Profile extends Component {

  static propTypes = {
    profile: PropTypes.shape({
      name: PropTypes.string,
      rating: PropTypes.number,
      title: PropTypes.string,
      reviews: PropTypes.array
    }).isRequired,
    getProfile: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { getProfile } = this.props

    getProfile()
  }

  render() {
    const { profile: {
      loading,
      data: { name, rating, title, reviews }
    } } = this.props

    return (
      <div className='page-container profile'>
        {
          loading
            ? 'Loading...'
            : <div>
              <ProfileHeader name={name} rating={rating} title={title} />
              <div>
                {Array.isArray(reviews) && reviews.map((review, idx) => (
                  <Review {...review} key={idx} />
                ))}
              </div>
            </div>

        }
      </div>
    )
  }
}

Profile.propTypes = {
  profile: PropTypes.shape({
    name: PropTypes.string,
    rating: PropTypes.number,
    title: PropTypes.string,
    reviews: PropTypes.array
  }).isRequired,
  getProfile: PropTypes.func.isRequired
}

const mapStateToProps = store => ({
  profile: store.data.profile
})

const mapDispatchToProps = {
  getProfile
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
