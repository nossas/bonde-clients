import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { I18n } from 'react-i18next'
import { Text, Button, Icon, Flexbox2 as Flexbox } from 'bonde-styleguide'
import { ButtonLink } from 'components/Link'
import { authSession } from 'services/auth'
import { UserCommunities } from 'scenes/Dashboard/components'
import { toSnakeCase } from 'scenes/Dashboard/utils'
import { ImageColumn, TableCardGadget } from 'scenes/Dashboard/scenes/Home/components'

const RenderText = ({ row }) => (
  <Fragment>
    <Text fontSize={16} fontWeight={900} lineHeight={1.25}>
      {row.name}
    </Text>
    <Text fontSize={13} lineHeight={1.54} color='#4a4a4a'>
      {row.description || row.city}
    </Text>
  </Fragment>
)

RenderText.propTypes = {
  row: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    city: PropTypes.string
  })
}

const CommunityLinkModule = ({ row }) => (
   <Flexbox horizontal spacing='between'>
     <ButtonLink flat to={`/admin/${row.id}/chatbot`}>
       <Icon size={20} name='bot' />
     </ButtonLink>
     <Button
       flat
       onClick={() => {
         authSession
          .setAsyncItem('community', toSnakeCase(row))
          .then(() => {
            const baseUrl = process.env.REACT_APP_DOMAIN_ADMIN || 'http://app.bonde.devel:5001'
            window.open(baseUrl, '_self')
          })
       }}
     >
       <Icon size={20} name='window' /></Button>
   </Flexbox>
)

const columns = [
  {
    field: 'image',
    render: ImageColumn,
    props: { width: '40px' }
  },
  {
    field: 'text',
    render: RenderText
  },
  {
    field: 'id',
    render: CommunityLinkModule,
    props: { width: '150px' }
  }
]

const CommunitiesGadget = () => (
  <UserCommunities
    component={({ loading, communities }) => (
      <I18n ns='home'>
      {t => (
        <TableCardGadget
          loading={loading}
          data={communities}
          columns={columns}
          title={t('gadgets.communities.title')}
          emptyIcon='community'
          emptyText={t('gadgets.communities.emptyText')}
        />
      )}
      </I18n>
    )}
  />
)

export default CommunitiesGadget
