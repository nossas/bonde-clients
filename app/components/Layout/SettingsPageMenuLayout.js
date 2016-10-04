import React, { PropTypes } from 'react'
import classnames from 'classnames'

const SettingsPageMenuLayout = ({ children, title, className }) => (
  <div
    className={classnames(
      'settings-page-menu-layout bg-white pt3 pr4 pl5',
      className
    )}
  >
    <h1 className="h1 mt0 mb3">{title}</h1>
    {children}
  </div>
)

SettingsPageMenuLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  title: PropTypes.string.isRequired
}

export default SettingsPageMenuLayout
