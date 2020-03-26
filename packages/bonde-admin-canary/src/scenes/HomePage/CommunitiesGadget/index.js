import React, { useState } from 'react'
import { I18n } from 'react-i18next'
import { useSession } from 'bonde-core-tools'
import TableCardGadget from 'components/DatasetGadget'
import SearchInput from './SearchInput'
import columns from './columns'

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
          renderFilter={() =>
            <SearchInput
              placeholder='Buscar comunidade'
              field='name'
              data={communities}
              onChange={setData}
            />
          }
          emptyIcon='community'
          emptyText={t('gadgets.communities.emptyText')}
        />
      )}
    </I18n>
  )
}

export default CommunitiesGadget
