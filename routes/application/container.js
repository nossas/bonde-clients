import React, { PropTypes } from 'react'

// Global module dependencies
import { Loading } from '~components/await'
import Sidebar from '~components/navigation/sidebar/sidebar'

const MobilizationDashboardContainer = ({ children, loading, sidebarProps }) => {
  return loading ? <Loading /> : (
    <Sidebar {...sidebarProps}>
      {children && React.cloneElement(children)}
    </Sidebar>
  )
}

MobilizationDashboardContainer.propTypes = {
  children: PropTypes.node.isRequired,
  loading: PropTypes.bool,
  sidebarProps: PropTypes.object.isRequired,
  relationshipId: PropTypes.number.isRequired,
  // Actions
  asyncFetch: PropTypes.func.isRequired
}

export default MobilizationDashboardContainer
