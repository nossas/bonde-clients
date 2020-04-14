import React from 'react'
import PropTypes from 'prop-types'
import { Route, useLocation } from 'react-router'
import { useSession, useQuery } from 'bonde-core-tools'

import Section from 'scenes/components/Section'
import { chatbotInfoQuery } from 'scenes/ChatbotPage/graphql'
import {
  ChatbotCampaignsList,
  ChatbotSettingsForm,
  ChatbotPersistentMenu,
  FetchChatbotCampaigns
} from 'scenes/ChatbotPage/components'
import Navigation from 'scenes/ChatbotPage/page/Navigation'

const Container = ({ children }) => (
  <Section title='Chatbot' navigation={Navigation}>
    {children}
  </Section>
)

Container.propTypes = {
  children: PropTypes.any
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
    <FetchChatbotCampaigns
      chatbotId={chatbot.id}
      queryParams={search}
      match={match}
    >
      {({ campaigns, params }) => (
        <>
          <Route exact path={match.path}>
            <Container>
              <ChatbotCampaignsList
                match={match}
                params={params}
                chatbotCampaigns={campaigns}
              />
            </Container>
          </Route>
          <Route exact path={`${match.path}/menu`}>
            <Container>
              <ChatbotPersistentMenu chatbot={{ ...chatbot, campaigns }} />
            </Container>
          </Route>
          <Route exact path={`${match.path}/settings`}>
            <Container>
              <ChatbotSettingsForm chatbotId={chatbot.id} />
            </Container>
          </Route>
        </>
      )}
    </FetchChatbotCampaigns>
  )
}

ChatbotPage.propTypes = {
  match: PropTypes.any
}

export default ChatbotPage
