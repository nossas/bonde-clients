import React from 'react'
import { withLastLocation, PageLayout } from 'services/router'
import { Tutorial } from 'components'

const TutorialPageLayout = ({ lastLocation, ...rest }) => {
  const showTutorial = lastLocation && lastLocation.pathname === '/admin/tags'
  return (
    <Tutorial initialize={showTutorial}>
      <PageLayout {...rest} />
    </Tutorial>
  )
}

export default withLastLocation(TutorialPageLayout)