import React from 'react'
import { MetricsMobilization } from '~client/components/metrics'
import { Title } from '~client/components/title'
import { SettingsPageLayout, SettingsPageContentLayout } from '~client/components/layout'
import { SettingsMenu } from '~client/mobilizations/components'

const MobilizationsSettingsMetricsPage = props => (
  <SettingsPageLayout>
    <SettingsMenu {...props} />
    <SettingsPageContentLayout>
      <Title>Métricas</Title>
      <MetricsMobilization mobilizationId={props.mobilization.id} />
    </SettingsPageContentLayout>
  </SettingsPageLayout>
)

export default MobilizationsSettingsMetricsPage
