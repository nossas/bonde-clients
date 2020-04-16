import React from 'react'
import PropTypes from 'prop-types'
import { useMutation } from 'bonde-core-tools'
import { withRouter } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
  Button,
  Flexbox2 as Flexbox,
  DataListCard,
  SwitchSlider,
  Text,
  Title,
  Icon
} from 'bonde-styleguide'
import { ButtonLink } from 'components/Link'
import {
  updateChatbotCampaignsMutation,
  chatbotCampaignsQuery,
  deleteChatbotCampaignsMutation
} from '../graphql'

const NameField = ({ value }) => (
  <Title.H4>{value}</Title.H4>
)

NameField.propTypes = {
  value: PropTypes.string
}

const StatusButtonField = ({ value, row }) => {
  const [updateCampaign] = useMutation(updateChatbotCampaignsMutation, {
    refetchQueries: [
      { query: chatbotCampaignsQuery, variables: { chatbotId: row.chatbot_id, filter: value } }
    ]
  })

  return (
    <SwitchSlider
      round
      checked={value === 'active'}
      onChange={() => {
        const variables = {
          id: row.id,
          campaign: {
            name: row.name,
            prefix: row.prefix,
            diagram: row.diagram,
            status: value === 'active' ? 'inactive' : 'active'
          }
        }
        updateCampaign({ variables })
          .then((data) => {
            toast('Pronto! Alterações salvas e publicadas no seu bot.', { type: toast.TYPE.SUCCESS })
          })
      }}
    >
      <Text>{value === 'active' ? 'ATIVO' : 'INATIVO'}</Text>
    </SwitchSlider>
  )
}

StatusButtonField.propTypes = {
  value: PropTypes.string,
  row: PropTypes.object
}

const MenuField = withRouter(({ match, history, value, row }) => {
  const [deleteCampaign] = useMutation(deleteChatbotCampaignsMutation, {
    refetchQueries: [
      { query: chatbotCampaignsQuery, variables: { chatbotId: row.chatbot_id } }
    ]
  })

  return (
    <Flexbox horizontal>
      <Button
        flat
        onClick={() => {
          history.push(`${match.url}/campaign/${value}`)
        }}
      >
        <Icon name='pencil' /> Editar
      </Button>
      <Button
        flat
        onClick={() => {
          deleteCampaign({ variables: { campaignId: Number(value) } })
            .then(() => {
              toast('Pronto! Alterações salvas e publicadas no seu bot.', { type: toast.TYPE.SUCCESS })
            })
        }}
      >
        <Icon name='trash' /> Excluir
      </Button>
    </Flexbox>
  )
})

MenuField.propTypes = {
  value: PropTypes.string
}

const fields = {
  name: { label: 'Nome do fluxo', render: NameField },
  status: { label: 'Status', render: StatusButtonField },
  id: { label: 'Ações', render: MenuField, width: 500 }
}

const CampaignsList = ({ chatbotCampaigns, match, params }) => {
  return (
    <Flexbox vertical>
      <Flexbox horizontal spacing='between'>
        <Flexbox horizontal justify='flex-start'>
          <ButtonLink flat to={match.url} active={!params.filter}>TODOS</ButtonLink>
          <ButtonLink flat to={`${match.url}?filter=active`} active={params.filter === 'active'}>ATIVOS</ButtonLink>
          <ButtonLink flat to={`${match.url}?filter=inactive`} active={params.filter === 'inactive'}>INATIVOS</ButtonLink>
        </Flexbox>
        <ButtonLink to={`${match.url}/campaign/new`}>Novo fluxo</ButtonLink>
      </Flexbox>
      <DataListCard
        border='separate'
        fields={fields}
        items={chatbotCampaigns}
      />
    </Flexbox>
  )
}

CampaignsList.defaultProps = {
  chatbotCampaigns: []
}

CampaignsList.propTypes = {
  chatbotCampaigns: PropTypes.array,
  match: PropTypes.object,
  params: PropTypes.object
}

export default CampaignsList
