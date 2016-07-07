import React, { Component, PropTypes } from 'react'
import ReactS3Uploader from 'react-s3-uploader'

class ChoiceCombined extends Component {

  constructor(props) {
    super(props)
  }

  handleUploadProgress(percent) {
    this.setState({ uploadProgress: percent })
  }

  handleUploadError() {
    this.setState({ uploadProgress: null })
  }

  render() {
    const { firstChoice, secondChoice, handleUploadFinish } = this.props
    return (
      <div>
        <span className="border rounded p1 m1 border-navy navy">{firstChoice}</span>
        <span className="m1 navy">+</span>
        <span className="border rounded p1 m1 border-navy navy">{secondChoice}</span>
        <ReactS3Uploader
          className="button bg-gray m2"
          signingUrl={`${process.env.API_URL}/uploads`}
          accept="image/*"
          onProgress={::this.handleUploadProgress}
          onError={::this.handleUploadError}
          onFinish={(image) => {
            const imageUrl = image.signedUrl.substring(0, image.signedUrl.indexOf('?'))
            this.setState({ bgImage: imageUrl, uploadProgress: null })
            handleUploadFinish({first_choice: firstChoice, second_choice: secondChoice, goal_image: imageUrl})
          }} />
      </div>
    )
  }
}

ChoiceCombined.propTypes = {
  firstChoice: PropTypes.string.isRequired,
  secondChoice: PropTypes.string.isRequired
}

export default ChoiceCombined
