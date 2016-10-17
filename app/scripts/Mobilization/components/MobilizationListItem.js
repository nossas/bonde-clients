import React, { PropTypes } from 'react'
import classnames from 'classnames'

import './scss/mobilization-list-item.scss'

export const MobilizationListItem = ({ children, className }) => (
  <div
    className={classnames(
      'mobilization-list-item bg-white block clearfix hover relative',
      className
    )}
  >
    {children}
  </div>
)

MobilizationListItem.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  className: PropTypes.string
}

export default MobilizationListItem
