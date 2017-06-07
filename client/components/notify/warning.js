import PropTypes from 'prop-types'
import React from 'react'

if (require('exenv').canUseDOM) require('./warning.scss')

const Warning = ({ title, children }) => (
  <div className='c--notify-warning'>
    <span className='c--notify-warning-icon'>
      <i
        className='fa fa-exclamation-triangle'
      />
    </span>

    <div className='c--notify-warning-content'>
      <div className='c--notify-warning-title'>
        {title}
      </div>
      <div className='c--notify-warning-message'>
        {children}
      </div>
    </div>
  </div>
)

Warning.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired
}

export default Warning
