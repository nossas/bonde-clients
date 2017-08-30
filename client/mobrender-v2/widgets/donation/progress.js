import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'

if (require('exenv').canUseDOM) require('./progress.scss')

const Progress = ({
  className,
  value,
  max,
  valueTopLeft,
  valueTopRight,
  valueBottomLeft,
  valueBottomRight
}) => (
  <div className={classnames('progress-container', className)}>
    <div className='progress-top'>
      <div className='progress-top-left'>{valueTopLeft}</div>
      <div className='progress-top-right'>{valueTopRight}</div>
    </div>

    <progress
      className={classnames(
        'progress',
        {
          'is-primary': value >= 50,
          'is-warning': value >= 30 && value < 50,
          'is-danger': value < 30
        }
      )}
      value={value}
      max={max}
    >
      {value}%
    </progress>

    <div className='progress-bottom'>
      <div className='progress-bottom-left'>{valueBottomLeft}</div>
      <div className='progress-bottom-right'>{valueBottomRight}</div>
    </div>
  </div>
)

Progress.propTypes = {
  className: PropTypes.string,
  value: PropTypes.number.isRquired,
  max: PropTypes.number,
  valueTopLeft: PropTypes.node,
  valueTopRight: PropTypes.node,
  valueBottomLeft: PropTypes.node,
  valueBottomRight: PropTypes.node
}

Progress.defaultProps = {
  max: 100
}

export default Progress
