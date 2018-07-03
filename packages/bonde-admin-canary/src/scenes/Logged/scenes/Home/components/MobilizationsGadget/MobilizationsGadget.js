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
    field: 'score',
    render: ({ value }) => (
      <Text fontSize={13} lineHeight={1.54} color='#4a4a4a'>
        {value || '–'}
      </Text>
    )
  },
  {
    field: 'id',
    render: ({ value }) => (
      <Link to={`/admin/mobilizations/${value}`}>
        <Icon name='angle-right' />
      </Link>
    )
  }
]

const MobilizationList = ({
  t,
  loading,
  mobilizations,
  filter,
  onChangeFilter,
  page,
  onChangePage,
  pageTotal
}) => (
  <TableCardGadget
    border
    loading={loading}
    data={mobilizations}
    columns={columns}
    title={t('gadgets.mobilizations.title')}
    emptyIcon='mobilization'
    emptyText={t('gadgets.mobilizations.emptyText')}
    renderFilter={() => <Filter filter={filter} onChange={onChangeFilter} />}
    renderPagination={() => pageTotal ? (
      <Pagination
        page={page}
        pages={pageTotal}
        onClickFirst={() => onChangePage(1)}
        onClickNext={() => onChangePage(page + 1)}
        onClickPrev={() => onChangePage(page - 1)}
        onClickItem={(index) => onChangePage(index + 1)}
        onClickLast={() => onChangePage(pageTotal)}
      />
    ) : null}
  />
)

const MobilizationsGadgetQueryset = ({ t }) => {
  const limit = 50
  return (
    <Queryset
      observable
      query={allUserMobilizationsQuery}
      limit={limit}
      filter={{ orderBy: 'UPDATED_AT_DESC' }}
    >
      {({ loading, data, filter, onChangeFilter, page, onChangePage }) => {

        const pageTotal = data && data.allUserMobilizations
          ? Math.ceil(data.allUserMobilizations.totalCount / limit)
          : null

        return (
          <MobilizationList
            t={t}
            filter={filter}
            onChangeFilter={onChangeFilter}
            page={page}
            onChangePage={onChangePage}
            loading={loading}
            mobilizations={data && data.allUserMobilizations ? data.allUserMobilizations.nodes : []}
            pageTotal={pageTotal}
          />
        )
      }}
    </Queryset>
  )
}

export default MobilizationsGadgetQueryset
