import React from 'react'
import { ResponsiveUI } from 'components'
import CommunitiesGadget from './CommunitiesGadget'
import MobilizationsGadget from './MobilizationsGadget'

const HomePage = () => (
  <ResponsiveUI.Row>
    <ResponsiveUI.Col xs={6} sm={12}>
      <CommunitiesGadget />
    </ResponsiveUI.Col>
    <ResponsiveUI.Col xs={6} sm={12}>
      <MobilizationsGadget />
    </ResponsiveUI.Col>
  </ResponsiveUI.Row>
)

export default HomePage
