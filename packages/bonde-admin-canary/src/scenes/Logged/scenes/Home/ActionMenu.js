import React from 'react'
import { I18n } from 'react-i18next'
import { Header } from 'components/PageLogged'

const ActionMenu = () => (
 <I18n ns='home'>
  {t => (
    <Header.ActionButtonGroup>
      <Header.ActionButton
        dark
        to='/admin/mobilization/add'
        label={t('actionButtons.mobilization')}
      />
      <Header.ActionButton
        to='/admin/community/add'
        label={t('actionButtons.community')}
      />
    </Header.ActionButtonGroup>
  )}
 </I18n>
)

export default ActionMenu
