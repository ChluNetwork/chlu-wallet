import React, { Component } from 'react'
import PictureUpload from 'components/MaterialDashboardPro/PictureUpload'

class ProfilePicture extends Component {
  render() {
    const { profile = {} } = this.props
    return  <PictureUpload
      imageDataUrl={profile.avatarDataUrl}
    />
  }
}

export default ProfilePicture