import React, { Component, PropTypes } from 'react'
import ReactS3Uploader from 'react-s3-uploader'
import classnames from 'classnames'

import { Progress } from './../../components'

class ChoiceCombined extends Component {

  constructor(props) {
    super(props)
    this.state = {
      uploadProgress: 0,
      uploadFinished: false
    }
  }

  handleUploadProgress(percent) {
    this.setState({ uploadProgress: percent })
  }

  handleUploadError() {
    this.setState({ uploadProgress: null })
  }

  handleUploadFinish(image) {
    const { firstChoice, secondChoice, handleUploadFinish } = this.props
    const imageUrl = image.signedUrl.substring(0, image.signedUrl.indexOf('?'))
    this.setState({
      bgImage: imageUrl,
      uploadProgress: 'success',
      uploadFinished: true
    })

    handleUploadFinish({
      first_choice: firstChoice,
      second_choice: secondChoice,
      goal_image: imageUrl
    })
  }

  render() {
    const { firstChoice, secondChoice, classes } = this.props

    const {
      uploadProgress,
      uploadFinished
    } = this.state

    const uploadButtonColor = uploadProgress === 'success' ? 'bg-olive' : 'bg-gray'

    return (
      <div className={classnames('clearfix mb1', classes)}>
        <div className="md-col md-col-3 px1">
          <ReactS3Uploader
            className={classnames('md-col md-col-12 button', uploadButtonColor)}
            signingUrl={`${process.env.API_URL}/uploads`}
            accept="image/*"
            onProgress={::this.handleUploadProgress}
            onError={::this.handleUploadError}
            onFinish={::this.handleUploadFinish} />
          <div className="md-col md-col-12" style={{ marginTop: '3px' }}>
            { !uploadFinished
              && !!uploadProgress
              && <Progress
                className="bg-olive"
                percent={this.state.uploadProgress}
                style={{ height: '6px' }} /> }
          </div>
        </div>
        <div className="md-col md-col-9 px1">
          <span className="col border rounded p1 ml1 mr1 border-navy navy">{firstChoice}</span>
          <span className="col m1 navy">+</span>
          <span className="col border rounded p1 ml1 mr1 border-navy navy">{secondChoice}</span>
        </div>
      </div>
    )
  }
}

ChoiceCombined.propTypes = {
  firstChoice: PropTypes.string.isRequired,
  secondChoice: PropTypes.string.isRequired,
  classes: PropTypes.array
}

export default ChoiceCombined
