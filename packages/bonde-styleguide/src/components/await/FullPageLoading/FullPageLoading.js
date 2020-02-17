import React from 'react'
import PropTypes from 'prop-types'
import { Backdrop, TextLoading } from '../../../'

const LoadingFullScreen = ({ bgColor, message }) => (
  <Backdrop color={bgColor}>
    <TextLoading message={message} />
  </Backdrop>
)

LoadingFullScreen.propTypes = {
	bgColor: PropTypes.string,
  message: PropTypes.string
}

LoadingFullScreen.defaultProps = {
	bgColor: '#fff'
}

export default LoadingFullScreen
