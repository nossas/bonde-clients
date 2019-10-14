import React from 'react'
import PropTypes from 'prop-types'
import { Mutation } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
  Button,
  Flexbox2 as Flexbox,
  DataListCard,
  SwitchSlider,
  Text,
  Title,
  Grid,
  Cell,
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

const StatusButtonField = ({ value, row }) => (
  <Mutation
    mutation={updateChatbotCampaignsMutation}
    refetchQueries={[{ query: chatbotCampaignsQuery, variables: { chatbotId: row.chatbot_id } }]}
  >
    {(mutation) => (
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
          mutation({ variables })
            .then((data) => {
              toast('Pronto! Alterações salvas e publicadas no seu bot.', { type: toast.TYPE.SUCCESS })
            })
        }}
      >
        <Text>{value === 'active' ? 'ATIVO' : 'INATIVO'}</Text>
      </SwitchSlider>
    )}
  </Mutation>
)

StatusButtonField.propTypes = {
  value: PropTypes.string,
  row: PropTypes.object
}

const MenuField = withRouter(({ match, history, value, row }) => {
  return (
    <Mutation
      mutation={deleteChatbotCampaignsMutation}
      refetchQueries={[{ query: chatbotCampaignsQuery, variables: { chatbotId: row.chatbot_id } }]}
    >
      {(mutation) => (
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
              mutation({ variables: { campaignId: Number(value) } })
                .then(() => {
                  toast('Pronto! Alterações salvas e publicadas no seu bot.', { type: toast.TYPE.SUCCESS })
                })
            }}
          >
            <Icon name='trash' /> Excluir
          </Button>
        </Flexbox>
      )}
    </Mutation>
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

const CampaignsList = ({ chatbotCampaigns, match }) => {
  return (
    <Flexbox vertical>
      <Flexbox horizontal spacing='between'>
        <Flexbox horizontal justify='flex-start'>
          <Button flat active>TODOS</Button>
          <Button flat>ATIVOS</Button>
          <Button flat>INATIVOS</Button>
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
  match: PropTypes.object
}

export default CampaignsList
