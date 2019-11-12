import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'services/auth'
import { Redirect } from 'services/router'
import { ContentPage } from 'scenes/Dashboard/components'
import { Query } from 'react-apollo'
import {
  ChatbotCampaignsList,
  ChatbotSettingsForm,
  ChatbotPersistentMenu
} from './components'
import CampaignsList from './components/CampaignsList'
import CampaignPage from './scenes/Campaign'
import { chatbotInfoQuery } from './graphql'

const ChatbotPage = ({ match, location, community }) => {
  const { modules } = community
  const chatbotId = Number(match.params.chatbotId)
  if (!modules.chatbot || modules.chatbot !== chatbotId) {
    return <Redirect to={`/admin/${community.id}/settings`} />
  }

  return (
    <Query query={chatbotInfoQuery} variables={{ id: chatbotId }}>
      {({ loading, data, error }) => {
        if (loading) return 'Loading...'
        if (error) return 'Error...'

        const chatbot = data.chatbots[0]
        return (
          <ChatbotCampaignsList
            chatbotId={chatbot.id}
            queryParams={location.search}
            dataListComponent={({ chatbotCampaigns, params }) => {
              return (
                <React.Fragment>
                  <Route
                    exact
                    path={match.path}
                    component={ContentPage}
                    componentProps={{
                      community,
                      chatbotCampaigns,
                      params,
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
                    componentProps={{
                      community,
                      chatbot: {
                        ...chatbot,
                        campaigns: chatbotCampaigns
                      }
                    }}
                  />
                  <Route
                    path={`${match.path}/campaign/:campaignId`}
                    component={CampaignPage}
                    componentProps={{
                      community,
                      chatbotCampaigns
                    }}
                  />
                </React.Fragment>
              )
            }}
          />
        )
      }}
    </Query>
  )
}

ChatbotPage.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  community: PropTypes.object.isRequired
}

export default ChatbotPage
