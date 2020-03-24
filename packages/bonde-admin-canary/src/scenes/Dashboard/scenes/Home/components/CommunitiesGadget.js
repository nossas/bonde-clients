import React, { Fragment, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { I18n } from 'react-i18next'
import { Text } from 'bonde-styleguide'
import { CommunityMenu, ImageColumn } from 'scenes/Dashboard/components'
import { useSession } from 'bonde-core-tools'
import TableCardGadget from 'components/DatasetGadget'

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

const columns = [
  {
    field: 'image',
    // eslint-disable-next-line react/display-name
    render: ({ row }) => <ImageColumn value={row.image} size={40} />, // eslint-disable-line react/prop-types
    props: { width: '40px' }
  },
  {
    field: 'text',
    render: RenderText
  },
  {
    field: 'id',
    // eslint-disable-next-line react/display-name
    render: ({ row }) => (<CommunityMenu community={row} />), // eslint-disable-line react/prop-types
    props: { width: '150px' }
  }
]

const SearchInput = ({ communities, onChange }) => {
  const inputRef = useRef(null)

  const normalize = (str) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase()

  const searching = (c) => {
    const search = inputRef.current.value
    if (search && search.length > 3) {
      return normalize(c.name).indexOf(normalize(search)) !== -1
    }
    return true
  }

  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        onChange(communities.filter(searching))
      }}
    >
      <input ref={inputRef} placeholder='Buscar comunidade' />
      <button type='submit'>OK!</button>
    </form>
  )
}

SearchInput.propTypes = {
  communities: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired
}

const CommunitiesGadget = () => {
  const { communities } = useSession()
  const [data, setData] = useState(communities)

  return (
    <I18n ns='home'>
      {t => (
        <TableCardGadget
          data={data}
          columns={columns}
          title={t('gadgets.communities.title')}
          renderFilter={() => <SearchInput communities={communities} onChange={setData} />}
          emptyIcon='community'
          emptyText={t('gadgets.communities.emptyText')}
        />
      )}
    </I18n>
  )
}

export default CommunitiesGadget
