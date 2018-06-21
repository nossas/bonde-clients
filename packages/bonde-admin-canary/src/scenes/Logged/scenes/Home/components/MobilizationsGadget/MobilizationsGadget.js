import React from 'react'
import { Link } from 'bonde-styleguide'
import {
  Text,
  Icon
} from 'bonde-styleguide'
import { Queryset } from 'components'
import ImageColumn from '../ImageColumn'
import TableCardGadget from '../TableCardGadget'
import StatusColumn from './StatusColumn'
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

const MobilizationList = ({ t, loading, mobilizations }) => (
  <TableCardGadget
    border
    loading={loading}
    data={mobilizations}
    columns={columns}
    title={t('gadgets.mobilizations.title')}
    emptyIcon='mobilization'
    emptyText={t('gadgets.mobilizations.emptyText')}
  />
)

const MobilizationsGadgetQueryset = ({ t }) => (
  <Queryset query={allUserMobilizationsQuery} limit={10}>
    {({ loading, data }) => {
      return (
        <MobilizationList
          t={t}
          loading={loading}
          mobilizations={data && data.allUserMobilizations ? data.allUserMobilizations.nodes : []}
        />
      )
    }}
  </Queryset>
)

export default MobilizationsGadgetQueryset
