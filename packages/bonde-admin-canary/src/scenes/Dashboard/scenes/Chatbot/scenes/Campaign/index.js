import React from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import { SubmitButton, FormGraphQLv2 } from 'components/Form'
import { Route } from 'services/auth'
import { ContentPage, FormContentPage } from 'scenes/Dashboard/components'
import CampaignDiagram from './components/CampaignDiagram'
import CampaignForm from './components/CampaignForm'
import Navigation from './components/Navigation'
import {
  updateChatbotCampaignsMutation,
  chatbotCampaignsQuery,
  insertChatbotCampaignsMutation
} from '../../graphql'


const formName = 'CampaignForm'

const Campaign = ({ match, community, chatbotCampaigns, history }) => {
  const chatbotId = Number(match.params.chatbotId)
  const defaultComponentProps = {
    community,
    form: FormGraphQLv2,
    formName: formName,
    title: 'Criar fluxo de conversa',
    backward: match.url.replace(/\/campaign\/+\w+/, ''),
    // eslint-disable-next-line react/display-name
    tabs: (props) => <Navigation {...props} match={match} />
  }
  const defaulFormProps = {
    query: chatbotCampaignsQuery,
    queryVariables: { chatbotId },
    onSuccess: () => toast('Salvo com sucesso!')
  }

  if (match.params.campaignId === 'new') {
    const formProps = {
      ...defaulFormProps,
      mutation: insertChatbotCampaignsMutation,
      mutationVariables: { chatbotId, status: 'draft' },
      cache: (readQuery, writeQuery, data) => {
        const { insert_chatbot_campaigns: { returning } } = data
        const { chatbot_campaigns: campaigns } = readQuery()
        campaigns.push(returning[0])
        writeQuery({ chatbot_campaigns: campaigns })
      },
      onSuccess: ({ data }) => {
        const { insert_chatbot_campaigns: { returning } } = data
        history.push(match.url.replace('/new', `/${returning[0].id}`))
        toast('Salvo com sucesso!')
      }
    }

    return (
      <Route
        exact
        path={match.path}
        component={FormContentPage}
        componentProps={{
          ...defaultComponentProps,
          formProps,
          render: CampaignForm,
          // eslint-disable-next-line react/display-name
          actions: () => <SubmitButton formName={formName}>Salvar e avançar</SubmitButton>
        }}
      />
    )
  } else {
    const campaign = chatbotCampaigns.filter(c => c.id === Number(match.params.campaignId))[0]
    const defaultValues = {
      name: campaign.name,
      prefix: campaign.prefix,
      diagram: campaign.diagram,
      id: campaign.id,
      status: campaign.status
    }
    const formProps = {
      ...defaulFormProps,
      mutation: updateChatbotCampaignsMutation,
      mutationVariables: defaultValues,
      cache: (readQuery, writeQuery, data) => {
        const { update_chatbot_campaigns: { returning } } = data
        const { chatbot_campaigns: campaigns } = readQuery()
        campaigns.map(c => c.id === returning[0].id ? returning[0] : c)
        writeQuery({ chatbot_campaigns: campaigns })
      }
    }

    return (
      <React.Fragment>
        <Route
          exact
          path={match.path}
          component={FormContentPage}
          componentProps={{
            ...defaultComponentProps,
            campaign,
            formProps,
            title: campaign.name,
            render: CampaignDiagram,
            actions: () => <SubmitButton formName={formName}>Salvar e publicar</SubmitButton>,
          }}
        />
        <Route
          exact
          path={`${match.path}/detail`}
          component={ContentPage}
          componentProps={{
            ...defaultComponentProps,
            title: campaign.name
          }}
        />
      </React.Fragment>
    )
  }
}

Campaign.propTypes = {
  match: PropTypes.object.isRequired,
  community: PropTypes.object.isRequired
}

export default Campaign
