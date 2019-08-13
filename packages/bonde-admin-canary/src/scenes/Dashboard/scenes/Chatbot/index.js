import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'services/auth'
import CampaignsList from './components/CampaignsList'
import SettingsForm from './components/SettingsForm'

const ChatbotPage = ({ match, community }) => {
  return (
    <React.Fragment>
      <Route
        exact
        path={match.path}
        component={CampaignsList}
        componentProps={{ community }}
      />
      <Route
        exact
        path={`${match.path}/settings`}
        component={SettingsForm}
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
