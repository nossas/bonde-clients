import React from 'react'
import { SettingsPageLayout, SettingsPageContentLayout } from '~client/components/layout'
import { SettingsMenu, MobilizationBasicsForm } from '~client/mobilizations/components'

const MobilizationsSettingsBasicsPage = props => (
  <SettingsPageLayout>
    <SettingsMenu {...props} />
    <SettingsPageContentLayout>
      <MobilizationBasicsForm floatSubmit {...props} />
    </SettingsPageContentLayout>
  </SettingsPageLayout>
)

export default MobilizationsSettingsBasicsPage
