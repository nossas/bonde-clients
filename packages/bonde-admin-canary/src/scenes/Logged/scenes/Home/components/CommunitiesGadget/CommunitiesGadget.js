import React from 'react'
import PropTypes from 'prop-types'
import { Text } from 'bonde-styleguide'
import { AllCommunities } from 'graphql/queries'
import ImageColumn from '../ImageColumn'
import TableCardGadget from '../TableCardGadget'

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

const CommunitiesGadget = ({ t, loading, communities }) => (
  <TableCardGadget
    loading={loading}
    data={communities}
    columns={columns}
    title={t('gadgets.communities.title')}
    emptyIcon='community'
    emptyText={t('gadgets.communities.emptyText')}
  />
)

CommunitiesGadget.propTypes = {
  communities: PropTypes.arrayOf(
    AllCommunities.propTypes.CommunitiesGadgetCommunity
  )
}

export default CommunitiesGadget
