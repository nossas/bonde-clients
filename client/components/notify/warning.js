import PropTypes from 'prop-types'
import React from 'react'

var styles = require('exenv').canUseDOM ? require('./warning.scss') : {}

const Warning = ({ title, children }) => (
  <div className={styles.notifyBox}>
    <span className={styles.notifyBoxIcon}>
      <i className='fa fa-exclamation-triangle' />
    </span>

    <div className={styles.notifyBoxContent}>
      <div className={styles.notifyBoxTitle}>
        {title}
      </div>
      <div className={styles.notifyBoxMessage}>
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
