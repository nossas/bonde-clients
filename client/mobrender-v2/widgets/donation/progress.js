import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'
import tinycolor from 'tinycolor2'
import * as formatNumberHelper from '~client/utils/format-number-helper'

if (require('exenv').canUseDOM) require('./progress.scss')

const colorStrategy = color => tinycolor(color).isDark() ? '#FFFFFF' : '#333333'

const Progress = ({
  className,
  value,
  max,
  valueTopLeft,
  valueTopRight,
  valueBottomLeft,
  valueBottomRight,
  fillColor
}) => (
  <div className={classnames('progress-container', className)}>
    <div className='progress-top'>
      <div className='progress-top-left'>{valueTopLeft}</div>
      <div className='progress-top-right'>{valueTopRight}</div>
    </div>

    <div className='progress' value={value} max={max}>
      <div className='progress-value'
        style={{
          backgroundColor: fillColor,
          width: `${value > 100 ? 100 : value}%`
        }}
      >
        {value > 5 && (
          <span className='percentage' style={{ color: colorStrategy(fillColor) }}>
            {formatNumberHelper.number(value).split(',')[0]}%
          </span>
        )}
      </div>
    </div>

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
  valueBottomRight: PropTypes.node,
  fillColor: PropTypes.string
}

Progress.defaultProps = {
  max: 100,
  fillColor: 'hsl(171, 100%, 41%)'
}

export default Progress
