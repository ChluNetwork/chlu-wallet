import React, { Component } from 'react'
import ProfileImageUpload from 'components/ProfileImageUpload'
import { connect } from 'react-redux'
import { updateProfilePicture } from 'store/modules/ui/profile'

class ProfileImageUploadContainer extends Component {

  render() {
    const { profile = {}, updateProfilePicture } = this.props
    return <ProfileImageUpload
      onChoosePicture={updateProfilePicture}
      imageDataUrl={profile.avatarDataUrl}
    />
  }
}

const mapStateToProps = state => ({
  profile: state.ui.profile.profile
})

const mapDispatchToProps = {
  updateProfilePicture
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileImageUploadContainer)