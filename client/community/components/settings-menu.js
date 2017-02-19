import React, { PropTypes } from 'react'
import { Tabs, Tab } from '~components/navigation'
import { SettingsPageMenuLayout } from '~components/layout'

import * as paths from '~community/paths'

const SettingsMenu = ({ location: { pathname } }) => {
  const editPath = paths.edit('info')
  const mailchimpPath = paths.edit('mailchimp')
  const recipientPath = paths.edit('recipient')

  return (
    <SettingsPageMenuLayout title='Configurações da comunidade'>
      <Tabs>
        <Tab text='Informações' path={editPath} isActive={editPath === pathname} />
        <Tab text='Mailchimp' path={mailchimpPath} isActive={mailchimpPath === pathname} />
        <Tab text='Recebedor' path={recipientPath} isActive={recipientPath === pathname} />
      </Tabs>
    </SettingsPageMenuLayout>
  )
}

SettingsMenu.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
}

export default SettingsMenu
