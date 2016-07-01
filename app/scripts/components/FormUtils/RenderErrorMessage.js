import React, { PropTypes } from 'react'
import classnames from 'classnames'


const RenderErrorMessage = ({ error, className }) => {
  if (error) {
    return (
      <div className={classnames("red center mt2", className)}>{ error }</div>
    )
  }
  return <noscript></noscript>
}

RenderErrorMessage.propTypes = {
  error: PropTypes.string,
  className: PropTypes.string
}

export default RenderErrorMessage
