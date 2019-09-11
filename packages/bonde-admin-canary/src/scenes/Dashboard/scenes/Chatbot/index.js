import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'services/auth'
import { Redirect } from 'services/router'
import { ContentPage } from 'scenes/Dashboard/components'
import {
  ChatbotCampaignsList,
  ChatbotSettingsForm,
  ChatbotPersistentMenu
} from './components'
import CampaignsList from './components/CampaignsList'
import CampaignPage from './scenes/Campaign'

const ChatbotPage = ({ match, community }) => {
  const modules = JSON.parse(community.modules)
  const chatbotId = Number(match.params.chatbotId)
  if (!modules.chatbot || modules.chatbot !== chatbotId) {
    return <Redirect to={`/admin/${community.id}/settings`} />
  }

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
              component={ChatbotSettingsForm}
              componentProps={{ community, chatbotId }}
            />
            <Route
              exact
              path={`${match.path}/persistent-menu`}
              component={ChatbotPersistentMenu}
              componentProps={{ community, chatbotId }}
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
