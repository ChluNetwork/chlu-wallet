import React from 'react'

import defaultImage from 'images/default-avatar.png'

class PictureUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null
    };
    this.handleImageChange = this.handleImageChange.bind(this);
  }

  handleImageChange(e) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({ file }, () => {
        console.log(this.state)
        if (this.props.onChoosePicture) this.props.onChoosePicture(this.state.file, this.state.imagePreviewUrl)
      });
    };
    reader.readAsDataURL(file);
  }

  setInputRef = input => this.input = input

  render() {
    const { imageDataUrl, onChoosePicture } = this.props
    const editable = typeof onChoosePicture === 'function'
    const containerStyle = editable ? null : { pointerEvents: 'none' }
    return (
      <div className='picture-container' style={containerStyle}>
        <div className='picture'>
          <img
            src={imageDataUrl || defaultImage}
            className='picture-src'
            alt='...'
          />
          { editable && <input ref={this.setInputRef} type='file' onChange={e => this.handleImageChange(e)} /> }
        </div>
      </div>
    );
  }
}

export default PictureUpload;
