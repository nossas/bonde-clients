import React, { Component, PropTypes } from 'react'
import ReactS3Uploader from 'react-s3-uploader'


class InsertImageButton extends Component {

  constructor(props) {
    super(props)
    this.state = { showInsertDialog: false, isLoading: false, image: null }
  }

  handleToggleDialog(e) {
    this.setState({ showInsertDialog: !this.state.showInsertDialog })
  }

  handleUploadProgress() {
    this.setState({ isLoading: true })
  }

  handleUploadError() {
    this.setState({ isLoading: false })
  }

  handleUploadFinish(e){
    const { handleUploadFinish } = this.props
    const imgUrl = e.signedUrl.substring(0, e.signedUrl.indexOf('?'))
    this.setState({ isLoading: false, image: imgUrl })

    handleUploadFinish(imgUrl)
  }

  render() {

    const { buttonClassName, popoverClassName } = this.props

    return (
      <div>
        <button className={buttonClassName} onClick={this.handleToggleDialog.bind(this)}>
          <i className="fa fa-image" />
        </button>
        {this.state.showInsertDialog && (
          <div className={popoverClassName}>
            <ReactS3Uploader
              signingUrl={`${process.env.API_URL}/uploads`}
              accept="image/*"
              onProgress={::this.handleUploadProgress}
              onError={::this.handleUploadError}
              onFinish={::this.handleUploadFinish}
            />
            <button
              disabled={this.state.image ? false : true}
              className="button button-outline white mr1"
              onClick={() => this.setState({ showInsertDialog: false, image: null })}>
              <i className="fa fa-check" />
            </button>
          </div>
        )}
      </div>
    )

  }
}

InsertImageButton.propTypes = {
  buttonClassName: PropTypes.string,
  popoverClassName: PropTypes.string,
  handleUploadFinish: PropTypes.func.isRequired,
}

export default InsertImageButton
