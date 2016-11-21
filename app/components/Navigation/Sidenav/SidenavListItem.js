import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import classnames from 'classnames'

class SidenavListItem extends Component {
  render() {
    const { text, icon, linkType, children, className, href, target } = this.props

    const elementTypes = {
      router: { component: Link, props: { to: href } },
      anchor: { component: 'a', props: { href, target } }
    }
    const current = elementTypes[linkType]
    const Component = current.component

    return (
      <div className={classnames('item', className)}>
        <Component
          className="block clearfix"
          {...current.props}
        >
          <div className="item-icon">
            <i className={`fa fa-${icon}`} />
          </div>
          <div className="item-content">
            <div>{text}</div>
            <div className="item-content-children">{children}</div>
          </div>
        </Component>
      </div>
    )
  }
}

SidenavListItem.contextTypes = {
  router: PropTypes.object
}

SidenavListItem.defaultProps = {
  linkType: 'anchor',
  target: '_self'
}

export default SidenavListItem
