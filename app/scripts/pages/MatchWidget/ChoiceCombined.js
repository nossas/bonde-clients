import React, { Component } from 'react'
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

  handleUploadFinish(image) {
    const imageUrl = image.signedUrl.substring(0, image.signedUrl.indexOf('?'))
    this.setState({ bgImage: imageUrl, uploadProgress: null })
  }

  render() {
    const { a, b } = this.props
    return (
      <div>
        <span className="border rounded p1 m1 border-navy navy">{a}</span>
        <span className="m1 navy">+</span>
        <span className="border rounded p1 m1 border-navy navy">{b}</span>
        <ReactS3Uploader
          className="button bg-gray m2"
          signingUrl={`${process.env.API_URL}/uploads`}
          accept="image/*"
          onProgress={::this.handleUploadProgress}
          onError={::this.handleUploadError}
          onFinish={::this.handleUploadFinish} />
      </div>
    )
  }
}

export default ChoiceCombined
