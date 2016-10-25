import React, { PropTypes } from 'react'
import { Link } from 'react-router'

import * as Paths from '~scripts/Paths'
import { Tabs, Tab } from '~Navigation'

const MobilizationsHeader = ({ location, mobilization }) => {
  const activeMobilizationsListPath = Paths.mobilizations()
  const mobilizationsTemplatesListPath = Paths.mobilizationTemplatesList(mobilization)
  return (
    <div>
      <Link
        to={Paths.newMobilization()}
        className="btn white bg-pagenta caps h4 py2 right rounded float-button"
      >
        <i className="fa fa-plus mr2" style={{ fontSize: '.75rem' }} />
        Nova mobilização
      </Link>
      <Tabs>
        <Tab
          path={activeMobilizationsListPath}
          text="Ativas"
          isActive={activeMobilizationsListPath === location.pathname}
        />
        <Tab
          path={mobilizationsTemplatesListPath}
          text="Templates"
          isActive={mobilizationsTemplatesListPath === location.pathname}
        />
      </Tabs>
    </div>
  )
}

MobilizationsHeader.propTypes = {
  location: PropTypes.shape({ pathname: PropTypes.string.isRequired }).isRequired,
  mobilization: PropTypes.object.isRequired
}

export default MobilizationsHeader
