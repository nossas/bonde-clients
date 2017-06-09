import PropTypes from 'prop-types'
import React from 'react'

var styles = require('exenv').canUseDOM ? require('./info.scss') : {}

const Info = ({ title, children }) => (
  <div className={styles.notifyBox}>
    <span className={styles.notifyBoxIcon}>
      <i className='fa fa-info-circle' />
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

Info.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired
}

export default Info
