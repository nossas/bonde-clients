import React from 'react'

import { SettingsPageLayout } from '../../../../../components/Layout'

import { Menu } from '../components'

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
