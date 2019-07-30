import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'services/auth'
import { EditCampaign, ListCampaign } from './scenes'

const Root = ({ match }) => (
  <React.Fragment>
    <Route
      exact
      path={match.url}
      component={ListCampaign}
    />

    <Route
      path={`${match.url}/:campaignId/campaign`}
      component={EditCampaign}
    />
  </React.Fragment>
)

Root.propTypes = {
  match: PropTypes.any
}

export default Root
