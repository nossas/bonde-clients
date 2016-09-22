import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import classnames from 'classnames'

class SidenavListItem extends Component {
  render() {
    const { text, icon, children, className, ...rest } = this.props
    return (
      <div className={classnames('item', className)}>
        <a {...rest} className="block clearfix">
          <div className="item-icon">
            <i className={`fa fa-${icon}`} />
          </div>
          <div className="item-content">
            <div>{text}</div>
            <div className="item-content-children">{children}</div>
          </div>
        </a>
      </div>
    )
  }
}

SidenavListItem.contextTypes = {
  router: PropTypes.object
}

export default SidenavListItem
