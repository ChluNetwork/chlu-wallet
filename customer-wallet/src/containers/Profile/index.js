import React from 'react'
// components
import ProfileHeader from './sections/HeaderSection'
import Review from './sections/Review'
// styles
import './styles.css'
// constants
import { reviews } from './assets/data'

const Profile = () => (
  <div className='page-container profile'>
    <ProfileHeader />
    <div>
      {reviews.map((review, idx) => (
        <Review {...review} key={idx} />
      ))}
    </div>
  </div>
)

export default Profile
