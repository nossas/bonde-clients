import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import ReactS3Uploader from 'react-s3-uploader'


class UploadImageField extends Component {

  onProgress() {

  }

  onError(error) {
    console.log('error', error)
  }

  onFinish(image) {
    const { $formGroup: { onChange } } = this.context
    const e = {
      value: image.signedUrl.substring(0, image.signedUrl.indexOf('?'))
    }
    onChange(e)
  }

  onClick() {
    ReactDOM.findDOMNode(this.refs.inputFile).click()
  }

  render() {
    const { className, signingUrl } = this.props
    const { $formGroup: { value } } = this.context

    return (
      <div className="uploadImageFile">
        <button type="button" className={className} onClick={this.onClick.bind(this)}>
          {value ? <img src={value} /> : <i className="fa fa-image" />}
        </button>
        <ReactS3Uploader
          signingUrl={signingUrl}
          accept="image/*"
          onProgress={this.onProgress.bind(this)}
          onError={this.onError.bind(this)}
          onFinish={this.onFinish.bind(this)}
          ref="inputFile"
        />
      </div>
    )
  }
}

UploadImageField.contextTypes = {
  $formGroup: PropTypes.shape({
    value: PropTypes.any,
    onChange: PropTypes.func.isRequired
  })
}

UploadImageField.propTypes = {
  className: PropTypes.string,
  signingUrl: PropTypes.string.isRequired
}

export default UploadImageField
