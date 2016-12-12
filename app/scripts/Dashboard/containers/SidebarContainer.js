import React, { Component } from 'react'
import { connect } from 'react-redux'
import { DashboardSidebar } from '../components'


class SidebarContainer extends Component {

  render() {
    const { children, ...props } = this.props

    return (
      <div className="top-0 right-0 bottom-0 left-0 flex flex-column absolute">
        <DashboardSidebar {...props} />
        {children && React.cloneElement(children)}
      </div>
    )
  }
}

export default SidebarContainer
