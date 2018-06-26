import React from 'react'
import { Text } from 'bonde-styleguide'
import { Queryset } from 'components'
import ImageColumn from '../ImageColumn'
import TableCardGadget from '../TableCardGadget'
import Filter from './Filter'
import allUserCommunities from './query.graphql'

const columns = [
  {
    field: 'image',
    render: ImageColumn
  },
  {
    field: 'text',
    render: ({ row }) => (
      <React.Fragment>
        <Text
          fontSize={16}
          fontWeight={900}
          lineHeight={1.25}
        >
          {row.name}
        </Text>
        <Text
          fontSize={13}
          lineHeight={1.54}
          color='#4a4a4a'
        >
          {row.description || row.city}
        </Text>
      </React.Fragment>
    )
  },
]

const CommunitiesGadget = ({ t, loading, communities, filter, onChangeFilter }) => (
  <TableCardGadget
    loading={loading}
    data={communities}
    columns={columns}
    title={t('gadgets.communities.title')}
    emptyIcon='community'
    emptyText={t('gadgets.communities.emptyText')}
    renderFilter={() => <Filter filter={filter} onChange={onChangeFilter} />}
  />
)

const CommunitiesGadgetQueryset = ({ t }) => (
  <Queryset
    observable
    query={allUserCommunities}
    filter={{ orderBy: 'UPDATED_AT_DESC' }}
  >
    {({ loading, data, filter, onChangeFilter }) => (
      <CommunitiesGadget
        t={t}
        loading={loading}
        filter={filter}
        onChangeFilter={onChangeFilter}
        communities={data && data.allUserCommunities ? data.allUserCommunities.nodes : []}
      />
    )}
  </Queryset>
)

export default CommunitiesGadgetQueryset
