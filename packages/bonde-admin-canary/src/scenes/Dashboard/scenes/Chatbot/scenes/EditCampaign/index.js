import React from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import { SubmitButton, FormGraphQLv2 } from 'components/Form'
import { Route } from 'services/auth'
import { ContentPage, FormContentPage } from 'scenes/Dashboard/components'
import CampaignDiagram from './components/CampaignDiagram'
import Navigation from './components/Navigation'
import { updateChatbotCampaignsMutation, chatbotCampaignsQuery } from '../../graphql'


const formName = 'EditCampaignForm'

const ChatbotEditCampaignPage = ({ match, community, chatbotCampaigns }) => {
  const chatbotId = Number(match.params.chatbotId)
  const campaign = chatbotCampaigns.filter(c => c.id === Number(match.params.campaignId))[0]
  const defaultValues = {
    name: campaign.name,
    prefix: campaign.prefix,
    diagram: campaign.diagram,
    id: campaign.id,
    status: campaign.status
  }
  const formProps = {
    mutation: updateChatbotCampaignsMutation,
    mutationVariables: defaultValues,
    query: chatbotCampaignsQuery,
    queryVariables: { chatbotId },
    onSuccess: () => toast('Salvo com sucesso!'),
    cache: (readQuery, writeQuery, data) => {
      const { update_chatbot_campaigns: { returning } } = data
      const { chatbot_campaigns: campaigns } = readQuery()
      campaigns.map(c => c.id === returning[0].id ? returning[0] : c)
      writeQuery({ chatbot_campaigns: campaigns })
    }
  }

  const componentProps = {
    community,
    title: campaign.name,
    backward: match.url.replace(/\/campaign\/+\d+/, ''),
    // eslint-disable-next-line react/display-name
    tabs: (props) => <Navigation {...props} match={match} />
  }
  return (
    <React.Fragment>
      <Route
        exact
        path={match.path}
        component={FormContentPage}
        componentProps={{
          ...componentProps,
          campaign,
          render: CampaignDiagram,
          form: FormGraphQLv2,
          formProps: { name: formName, ...formProps },
          // eslint-disable-next-line react/display-name
          actions: () => <SubmitButton formName={formName}>Salvar e publicar</SubmitButton>
        }}
      />
      <Route
        exact
        path={`${match.path}/detail`}
        component={ContentPage}
        componentProps={componentProps}
      />
      <Route
        exact
        path={`${match.path}/new`}
        component={ContentPage}
        componentProps={componentProps}
      />
    </React.Fragment>
  )
}

ChatbotEditCampaignPage.propTypes = {
  match: PropTypes.object.isRequired,
  community: PropTypes.object.isRequired
}

export default ChatbotEditCampaignPage
