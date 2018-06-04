import React from 'react'
import { Link } from 'bonde-styleguide'
import {
  TableHeader,
  Text,
  Icon
} from 'bonde-styleguide'
import ImageColumn from './ImageColumn'
import TableCardGadget from './TableCardGadget'

const StatusColumn = ({ value, t }) => {
  const statuses = {
    active: {
      label: t ? t('active') : 'ativo',
      props: { color: '#50e3c2', fontWeight: 'bold' }
    },
    draft: {
      label: t ? t('draft') : 'rascunho',
      props: { color: '#aaaaaa', fontWeight: 'normal' }
    }
  }

  return (
    <Text
      fontSize={13}
      lineHeight={1.54}
      {...statuses[value].props}
    >
      {value === 'active' && (
        <Icon name='tick' color='#50e3c2' margin='0 5px 0 0' />
      )}
      {statuses[value].label}
    </Text>
  )
}

const mobilizations = [
  {
    id: 2,
    image: 'https://goo.gl/JFHz3h',
    title: 'SParaMulheres',
    community: 'Minha Sampa',
    status: 'active',
    actionsCount: 16320,
  },
  {
    id: 3,
    image: 'https://goo.gl/FnqZWj',
    title: 'Ilumina SP',
    community: 'Minha Sampa',
    status: 'draft',
    actionsCount: 0,
  },
  {
    id: 9,
    image: 'https://goo.gl/RJZTGF',
    title: 'Heróis Invisíveis',
    community: 'Minha Sampa',
    status: 'active',
    actionsCount: 974,
  },
  {
    id: 14,
    image: 'https://goo.gl/2ygft6',
    title: 'Queima de Arquivo',
    community: 'Minha Sampa',
    status: 'active',
    actionsCount: 2453,
  },
  {
    id: 5,
    image: 'https://goo.gl/3Chgix',
    title: 'Paulista Aberta',
    community: 'Minha Sampa',
    status: 'draft',
    actionsCount: 0,
  }
]

const columns = [
  { field: 'image', render: ImageColumn },
  {
    field: 'title',
    render: ({ value }) => (
      <Text fontSize={16} fontWeight={900} lineHeight={1.25}>
        {value}
      </Text>
    )
  },
  {
    field: 'community',
    header: 'Comunidade',
    render: ({ value }) => (
      <Text fontSize={13} lineHeight={1.54} color='#4a4a4a'>
        {value}
      </Text>
    )
  },
  { field: 'status', header: 'Status', render: StatusColumn },
  {
    field: 'actionsCount',
    header: 'Ações',
    render: ({ value }) => (
      <Text fontSize={13} lineHeight={1.54} color='#4a4a4a'>
        {value || '—'}
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

const MobilizationList = ({ t }) => (
  <TableCardGadget
    border
    data={mobilizations}
    columns={columns}
    HeaderComponent={TableHeader}
    title='Minhas mobilizações'
    emptyIcon='mobilization'
    emptyText='As mobilizações das suas comunidades vão aparecer aqui.'
  />
)

export default MobilizationList
