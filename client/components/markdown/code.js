import React from 'react'

var styles = require('exenv').canUseDOM ? require('./code.scss') : {}

export default ({ children }) => (
  <span className={styles.code}>
    {children}
  </span>
)
