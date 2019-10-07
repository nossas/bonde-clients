import React from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import { createFirstMessage } from 'bonde-diagram'
import { MutationForm, SubmitButton } from 'components/Forms'
import { Route } from 'services/auth'
import { FormContentPage } from 'scenes/Dashboard/components'
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
    form: MutationForm,
    formId: formName,
    title: 'Criar fluxo de conversa',
    backward: match.url.replace(/\/campaign\/+\w+/, ''),
    // use div component to fix Flexbox render
    // eslint-disable-next-line react/display-name
    tabs: (props) => (
      <div>
        <Navigation {...props} match={match} />
      </div>
    )
  }
  const defaulFormProps = {
    refetchQueries: [{
      query: chatbotCampaignsQuery,
      variables: { chatbotId }
    }]
  }

  if (match.params.campaignId === 'new') {
    const formProps = {
      ...defaulFormProps,
      mutation: insertChatbotCampaignsMutation,
      parse: ({ campaign }) => {
        const firstMsg = campaign.diagram
        return {
          campaign: {
            ...campaign,
            diagram: createFirstMessage(firstMsg)
          }
        }
      },
      values: { campaign: { chatbot_id: chatbotId, status: 'draft' } },
      updateQuery: (readQuery, writeQuery, data) => {
        const { insert_chatbot_campaigns: { returning } } = data
        const { chatbot_campaigns: campaigns } = readQuery()
        campaigns.push(returning[0])
        writeQuery({ chatbot_campaigns: campaigns })
      },
      onSuccess: ({ data }) => {
        const { insert_chatbot_campaigns: { returning } } = data
        history.push(match.url.replace('/new', `/${returning[0].id}`))
        toast('Salvo com sucesso!', { type: toast.TYPE.SUCCESS })
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
          actions: () => <SubmitButton formId={formName}>Salvar e avançar</SubmitButton>
        }}
      />
    )
  } else {
    const campaign = chatbotCampaigns.filter(c => c.id === Number(match.params.campaignId))[0]
    const formProps = {
      ...defaulFormProps,
      mutation: updateChatbotCampaignsMutation,
      variables: { id: Number(campaign.id) },
      values: { campaign: { diagram: campaign.diagram } },
      parse: ({ campaign }) => ({
        campaign: {
          ...campaign,
          diagram: JSON.parse(campaign.diagram)
        }
      }),
      updateQuery: (readQuery, writeQuery, data) => {
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
            fullPage: true,
            title: campaign.name,
            render: CampaignDiagram,
            // eslint-disable-next-line react/display-name
            actions: () => <SubmitButton formId={formName}>Salvar</SubmitButton>
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
