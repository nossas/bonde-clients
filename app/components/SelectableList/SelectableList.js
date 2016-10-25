import React, { PropTypes } from 'react'
import classnames from 'classnames'

import './scss/selectable-list.scss'

const SelectableList = ({ children, className, style }) => (
  <div className={classnames('selectable-list bg-white rounded', className)} style={style}>
    {children}
  </div>
)

SelectableList.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  style: PropTypes.object,
}

export default SelectableList
