import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'services/auth'
import { ContentPage } from 'scenes/Dashboard/components'
import CampaignsList from './components/CampaignsList'
import SettingsForm from './components/SettingsForm'
import EditCampaign from './scenes/EditCampaign'

const ChatbotPage = ({ match, community }) => {
  return (
    <React.Fragment>
      <Route
        exact
        path={match.path}
        component={ContentPage}
        componentProps={{ community, render: CampaignsList }}
      />
      <Route
        exact
        path={`${match.path}/settings`}
        component={ContentPage}
        componentProps={{ community, render: SettingsForm }}
      />
      <Route
        path={`${match.path}/campaign/:campaignId`}
        component={EditCampaign}
        componentProps={{ community }}
      />
    </React.Fragment>
  )
}

ChatbotPage.propTypes = {
  match: PropTypes.object.isRequired,
  community: PropTypes.object.isRequired
}

export default ChatbotPage
