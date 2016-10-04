import React, { PropTypes } from 'react'
import classnames from 'classnames'

const SettingsPageContentLayout = ({ children, className }) => (
  <div
    className={classnames(
      'settings-page-content-layout clearfix overflow-auto',
      className
    )}
  >
    <div className="md-col-12 lg-col-9 clearfix py3 pr4 pl5">
      {children}
    </div>
  </div>
)

SettingsPageContentLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
}

export default SettingsPageContentLayout
