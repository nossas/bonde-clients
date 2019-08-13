import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'services/auth'

const DefaultComponent = () => (
  <h2>DefaultComponent</h2>
)

const ChatbotEditCampaignPage = ({ match, community }) => {
  console.log('ChatbotEditCampaignPage match', match)
  return (
    <React.Fragment>
      <Route
        exact
        path={match.path}
        component={DefaultComponent}
        componentProps={{ community }}
      />
      <Route
        exact
        path={`${match.path}/settings`}
        component={DefaultComponent}
        componentProps={{ community }}
      />
    </React.Fragment>
  )
}

ChatbotEditCampaignPage.propTypes = {
  match: PropTypes.object.isRequired,
  community: PropTypes.object.isRequired
}

export default ChatbotEditCampaignPage