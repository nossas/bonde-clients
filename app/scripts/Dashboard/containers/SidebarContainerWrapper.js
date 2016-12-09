import React, { Component } from 'react'
import { connect } from 'react-redux'
import { DashboardSidebar } from '../components'


export default (mapStateToProps, mapActionsToProps) => {

  class SidebarContainer extends Component {

    componentDidMount() {
      const { fetch } = this.props
      if (fetch) fetch(this.props)
    }

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

  return connect(mapStateToProps, mapActionsToProps)(SidebarContainer)
}
