import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'

if (require('exenv').canUseDOM) require('./progress.scss')

const Progress = ({ className, value, max }) => (
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
)

Progress.propTypes = {
  className: PropTypes.string,
  value: PropTypes.number.isRquired,
  max: PropTypes.number
}

Progress.defaultProps = {
  max: 100
}

export default Progress
