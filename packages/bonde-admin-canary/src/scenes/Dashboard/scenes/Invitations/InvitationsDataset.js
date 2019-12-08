import React from 'react'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { TableHeader } from 'bonde-styleguide'
import DatasetGadget from 'components/DatasetGadget'
import { graphqlApi } from 'services/graphql'

export const InvitationsQuery = gql`
  query InvitationsByCommunity($community_id: Int!) {
    invitations(where: { community_id: { _eq: $community_id } }, order_by: { created_at: desc_nulls_last }) {
      user_id
      created_at
      role
      email
      expired
      expires
    }
  }
`

const DateRender = ({ value }) => {
  return value ? new Date(value).toLocaleString() : ''
}

const BooleanRender = ({ value }) => {
  return value ? 'Convite aceito' : 'Aguardando aceite'
}

const columns = [
  {
    field: 'user_id',
    header: 'Usuário responsável'
  },
  {
    field: 'email',
    header: 'E-mail'
  },
  {
    field: 'role',
    header: 'Função'
  },
  {
    field: 'expired',
    header: 'Ativo',
    render: BooleanRender
  },
  {
    field: 'created_at',
    header: 'Criado em',
    render: DateRender
  },
  {
    field: 'expires',
    header: 'Expirado em',
    render: DateRender
  }
]

const InvitationsDataset = ({ community }) => {
  const { loading, error, data } = useQuery(InvitationsQuery, {
    variables: { community_id: community.id },
    client: graphqlApi,
    fetchPolicy: 'network-only'
  })
  return (
    <React.Fragment>
      {loading && (<p>Loading...</p>)}
      {error && (<p>{error}</p>)}
      {data && (
        <DatasetGadget
          HeaderComponent={(props) => <TableHeader {...props} />}
          loading={loading}
          data={data.invitations}
          columns={columns}
          emptyIcon='community'
          emptyText='Essa comunidade não possui mobilizadores convidados'
        />
      )}
    </React.Fragment>
  )
}

InvitationsDataset.propTypes = {
  community: PropTypes.object.isRequired
}

export default InvitationsDataset
