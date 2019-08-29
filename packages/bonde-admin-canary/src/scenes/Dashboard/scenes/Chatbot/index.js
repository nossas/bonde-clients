import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'services/auth'
import { ContentPage } from 'scenes/Dashboard/components'
import {
  ChatbotCampaignsList,
  ChatbotSettingsForm
} from './components'
import CampaignsList from './components/CampaignsList'
import CampaignPage from './scenes/Campaign'

const ChatbotPage = ({ match, community }) => {
  const chatbotId = Number(match.params.chatbotId)
  return (
    <ChatbotCampaignsList
      chatbotId={chatbotId}
      dataListComponent={({ chatbotCampaigns }) => {
        return (
          <React.Fragment>
            <Route
              exact
              path={match.path}
              component={ContentPage}
              componentProps={{
                community,
                chatbotCampaigns,
                render: CampaignsList
              }}
            />
            <Route
              exact
              path={`${match.path}/settings`}
              component={ContentPage}
              componentProps={{
                community,
                chatbotId,
                render: ChatbotSettingsForm
              }}
            />
            <Route
              path={`${match.path}/campaign/:campaignId`}
              component={CampaignPage}
              componentProps={{ community, chatbotCampaigns }}
            />
          </React.Fragment>
        )
      }}
    />
  )
}

ChatbotPage.propTypes = {
  match: PropTypes.object.isRequired,
  community: PropTypes.object.isRequired
}

export default ChatbotPage
