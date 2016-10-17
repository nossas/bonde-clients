import React, { PropTypes } from 'react'
import classnames from 'classnames'

const SettingsPageContentLayout = ({ children, className, containerClassName }) => (
  <div
    className={classnames(
      'settings-page-content-layout clearfix overflow-auto',
      className
    )}
  >
    <div
      className={classnames(
        'md-col-12 lg-col-9 clearfix py3 pr4 pl5',
        containerClassName
      )}
    >
      {children}
    </div>
  </div>
)

SettingsPageContentLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  containerClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
}

export default SettingsPageContentLayout
