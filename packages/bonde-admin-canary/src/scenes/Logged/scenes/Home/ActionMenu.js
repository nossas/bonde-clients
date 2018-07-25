import React from 'react'
import { I18n } from 'react-i18next'
import { Header } from 'components/PageLogged'
import { ListeningQueryset } from 'components/Queryset'
import { query as mobilizationsQuery } from './components/MobilizationsGadget'
import { query as communitiesGadgetQuery } from './components/CommunitiesGadget'

const ActionMenu = () => (
 <I18n ns='home'>
  {t => (
    <Header.ActionButtonGroup>
      <ListeningQueryset query={mobilizationsQuery}>
      {({ done, length }) => (
        <Header.ActionButton
          dark={done && length > 0}
          to='/admin/mobilization/add'
          label={t('actionButtons.mobilization')}
        />
      )}
      </ListeningQueryset>

      <ListeningQueryset query={communitiesGadgetQuery}>
      {({ done, length }) => (
        <Header.ActionButton
          dark={done && length > 0}
          to='/admin/community/add'
          label={t('actionButtons.community')}
        />
      )}
      </ListeningQueryset>
    </Header.ActionButtonGroup>
  )}
 </I18n>
)

export default ActionMenu
