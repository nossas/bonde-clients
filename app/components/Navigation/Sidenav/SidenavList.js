import React, { Component } from 'react'
import classnames from 'classnames'

class SidenavList extends Component {
  render() {
    const { children, className } = this.props
    return (
      <div className={classnames('items clearfix', className)}>
        {children}
      </div>
    )
  }
}

export default SidenavList
