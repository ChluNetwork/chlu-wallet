import React, { Component } from 'react'
import AvatarEditor from 'react-avatar-editor'
import PictureUpload from 'components/MaterialDashboardPro/PictureUpload'
import { withStyles, Button } from '@material-ui/core'

class ProfileImageUpload extends Component {

  constructor(props){
    super(props)
    this.state = {
      picture: null
    }
  }

  changePicture = picture => {
    this.setState({ picture })
  }

  cancel = () => {
    this.setState({ picture: null })
  }

  finish = () => {
    if (this.editor) {
      const canvas = this.editor.getImage()
      const dataUrl = canvas.toDataURL('image/jpeg', 0.5) // quality
      console.log('Chose new Profile Picture, data url:')
      console.log(dataUrl)
      this.props.onChoosePicture(dataUrl)
      this.setState({ picture: null })
    }
  }

  setEditorRef = editor => this.editor = editor

  render() {
    const { classes, imageDataUrl } = this.props
    const { picture } = this.state
    if (picture) {
      return <div className={classes.container}>
        <AvatarEditor
          ref={this.setEditorRef}
          image={picture}
          width={100}
          height={100}
          borderRadius={100}
          color={[255, 255, 255, 0.6]} // RGBA
          scale={1}
          rotate={0}
        />
        <div className={classes.buttons}>
          <Button onClick={this.finish}>Confirm</Button>
          <Button onClick={this.cancel}>Cancel</Button>
        </div>
      </div>
    } else {
      return <div className={classes.container}>
        <PictureUpload
          imageDataUrl={imageDataUrl}
          onChoosePicture={this.changePicture}
        />
        <div className={classes.textCenter}>Click the Picture to change it</div>
      </div>
    }
  }
}

const style = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  buttons: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textCenter: {
    textAlign: 'center'
  }
}

export default withStyles(style)(ProfileImageUpload)