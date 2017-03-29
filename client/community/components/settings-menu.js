import React, { PropTypes } from 'react'
import { Tabs, Tab } from '~components/navigation'
import { SettingsPageMenuLayout } from '~components/layout'

import * as paths from '~client/paths'

const SettingsMenu = ({ location: { pathname } }) => {
  const infoPath = paths.communityInfo()
  const mailchimpPath = paths.communityMailchimp()
  const recipientPath = paths.communityRecipient()
  const reportPath = paths.communityReport()

  return (
    <SettingsPageMenuLayout title='Configurações da comunidade'>
      <Tabs>
        <Tab text='Informações' path={infoPath} isActive={infoPath === pathname} />
        <Tab text='Mailchimp' path={mailchimpPath} isActive={mailchimpPath === pathname} />
        <Tab text='Recebedor' path={recipientPath} isActive={recipientPath === pathname} />
        <Tab text='Relatório' path={reportPath} isActive={reportPath === pathname} />
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
