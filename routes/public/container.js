import React from 'react'

var NotificationsSystem = () => <div />

if (require('exenv').canUseDOM) {
  require('~client/styles/main.scss')
  var theme = require('reapop-theme-wybo')
  NotificationsSystem = require('reapop').default
}

const PublicContainer = ({ children }) => (
  <div>
    {children}
    <NotificationsSystem {...{ theme }} />
  </div>
)

export default PublicContainer
