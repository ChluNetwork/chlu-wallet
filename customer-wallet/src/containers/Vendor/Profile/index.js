import React, { Component } from 'react'
import PropTypes from 'prop-types'
// redux
import { connect } from 'react-redux'
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
      title: PropTypes.string,
      reviews: PropTypes.array
    }).isRequired
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
            ? <CircularProgress />
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

const mapStateToProps = store => ({
  profile: store.data.profile
})

export default connect(mapStateToProps)(Profile)
