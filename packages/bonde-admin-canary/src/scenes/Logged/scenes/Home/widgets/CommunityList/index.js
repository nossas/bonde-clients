import React from 'react'
import { Query } from 'react-apollo'
import { TableCardGadget } from '../../components'
import ALL_COMMUNITIES from './allCommunities.graphql'
import columns from './columns'

const Communities = () => (
  <Query query={ALL_COMMUNITIES}>
    {({ loading, data }) => {
      return (
        <TableCardGadget
          loading={loading}
          data={data && data.allCommunities ? data.allCommunities.nodes : []}
          columns={columns}
          title='Minhas comunidades'
          emptyIcon='community'
          emptyText='Crie uma comunidade para começar a causar'
        />
      )
    }}
  </Query>
)

export default Communities
