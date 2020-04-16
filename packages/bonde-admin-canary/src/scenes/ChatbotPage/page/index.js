import React from 'react'
import PropTypes from 'prop-types'
import { Route, useLocation, useRouteMatch } from 'react-router'
import { useSession, useQuery } from 'bonde-core-tools'

import Section from 'scenes/components/Section'
import { chatbotInfoQuery } from 'scenes/ChatbotPage/graphql'
import {
  ChatbotCampaignsList,
  ChatbotSettingsForm,
  ChatbotPersistentMenu,
  FetchChatbotCampaigns
} from 'scenes/ChatbotPage/components'
import CampaignPage from 'scenes/ChatbotPage/scenes/Campaign'
import Navigation from 'scenes/ChatbotPage/page/Navigation'

const Container = ({ children }) => (
  <Section title='Chatbot' navigation={Navigation}>
    {children}
  </Section>
)

Container.propTypes = {
  children: PropTypes.any
}

const CampaignPageRoute = ({ path, campaigns, chatbot }) => {
  let match = useRouteMatch(path)

  return match ? (
    <CampaignPage
      match={match}
      chatbotId={chatbot.id}
      chatbotCampaigns={campaigns}
    />
  ) : null
}

CampaignPageRoute.propTypes = {
  path: PropTypes.string.isRequired,
  chatbot: PropTypes.any.isRequired,
  campaigns: PropTypes.array
}

const ChatbotPage = ({ match }) => {
  const { search } = useLocation()
  const { community: { modules } } = useSession()
  const variables = { id: Number(modules.chatbot) }

  const { loading, data, error } = useQuery(chatbotInfoQuery, { variables })

  if (loading) return 'Loading...'
  if (error) return 'Error...'

  const chatbot = data.chatbots[0]

  return (
    <Container>
      <FetchChatbotCampaigns
        chatbotId={chatbot.id}
        queryParams={search}
        match={match}
      >
        {({ campaigns, params }) => (
          <>
            <Route exact path={match.path}>
              <ChatbotCampaignsList
                match={match}
                params={params}
                chatbotCampaigns={campaigns}
              />
            </Route>
            <Route exact path={`${match.path}/menu`}>
              <ChatbotPersistentMenu chatbot={{ ...chatbot, campaigns }} />
            </Route>
            <Route exact path={`${match.path}/settings`}>
              <ChatbotSettingsForm chatbotId={chatbot.id} />
            </Route>
            <CampaignPageRoute
              path={`${match.path}/campaign/:campaignId`}
              chatbot={chatbot}
              campaigns={campaigns}
            />
          </>
        )}
      </FetchChatbotCampaigns>
    </Container>
  )
}

ChatbotPage.propTypes = {
  match: PropTypes.any
}

export default ChatbotPage
