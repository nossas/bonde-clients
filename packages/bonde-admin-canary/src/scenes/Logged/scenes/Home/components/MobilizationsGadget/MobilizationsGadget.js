import React from 'react'
import { Icon, Link, Text, Pagination } from 'bonde-styleguide'
import { Queryset } from 'components'
import ImageColumn from '../ImageColumn'
import TableCardGadget from '../TableCardGadget'
import StatusColumn from './StatusColumn'
import Filter from './Filter'
import allUserMobilizationsQuery from './query.graphql'

const columns = [
  { field: 'image', render: ImageColumn },
  {
    field: 'name',
    render: ({ value }) => (
      <Text fontSize={16} fontWeight={900} lineHeight={1.25}>
        {value}
      </Text>
    )
  },
  {
    field: 'community',
    render: ({ value }) => (
      <Text fontSize={13} lineHeight={1.54} color='#4a4a4a'>
        {value.name}
      </Text>
    )
  },
  { field: 'status', render: StatusColumn },
  {
    field: 'id',
    render: ({ value }) => (
      <Link to={`/admin/mobilizations/${value}`}>
        <Icon name='angle-right' />
      </Link>
    )
  }
]

const MobilizationList = ({ t, loading, mobilizations, filter, onChangeFilter }) => (
  <TableCardGadget
    border
    loading={loading}
    data={mobilizations}
    columns={columns}
    title={t('gadgets.mobilizations.title')}
    emptyIcon='mobilization'
    emptyText={t('gadgets.mobilizations.emptyText')}
    renderFilter={() => <Filter filter={filter} onChange={onChangeFilter} />}
    renderPagination={() => (
      <Pagination />
    )}
  />
)

const MobilizationsGadgetQueryset = ({ t }) => (
  <Queryset
    query={allUserMobilizationsQuery}
    limit={10}
    filter={{ orderBy: 'UPDATED_AT_DESC' }}
  >
    {({ loading, data, filter, onChangeFilter }) => {
      return (
        <MobilizationList
          t={t}
          filter={filter}
          onChangeFilter={onChangeFilter}
          loading={loading}
          mobilizations={data && data.allUserMobilizations ? data.allUserMobilizations.nodes : []}
        />
      )
    }}
  </Queryset>
)

export default MobilizationsGadgetQueryset
