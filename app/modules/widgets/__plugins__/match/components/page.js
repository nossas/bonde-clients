import React from 'react'

import { Menu } from '../../../../../modules/widgets/__plugins__/match/components'
import { SettingsPageLayout } from '../../../../../components/Layout'

const MatchPage = ({ widget, mobilization, location, children }) => (
  <SettingsPageLayout>
    <Menu
      widget={widget}
      mobilization={mobilization}
      location={location}
    />
    {children}
  </SettingsPageLayout>
)

export default MatchPage
