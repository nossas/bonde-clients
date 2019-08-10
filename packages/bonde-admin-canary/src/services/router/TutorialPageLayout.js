import React from 'react'
import PropTypes from 'prop-types'
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

TutorialPageLayout.propTypes = {
  lastLocation: PropTypes.shape({
    pathname: PropTypes.string
  })
}

export default withLastLocation(TutorialPageLayout)
