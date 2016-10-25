import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import classnames from 'classnames'

import * as Paths from '../../scripts/Paths'

import './scss/selectable-list-item.scss'

const SelectableListItem = ({ className, style, leftIcon, title, subtitle, rightIcon }) => (
  <Link
    className={classnames('selectable-list-item', className)}
    style={style}
    to={Paths.mobilizations()}
  >
    <i className={`bg-animation-icon fa fa-${rightIcon}`} />
    <i className={`icon left-icon fa fa-${leftIcon}`} />
    <span className="title">{title}</span>
    <span className="subtitle">{subtitle}</span>
    <i className={`icon right-icon fa fa-${rightIcon}`} />
  </Link>
)

SelectableListItem.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  style: PropTypes.object,
  leftIcon: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  rightIcon: PropTypes.string,
}

SelectableListItem.defaultProps = {
  rightIcon: 'arrow-circle-o-right'
}

export default SelectableListItem
