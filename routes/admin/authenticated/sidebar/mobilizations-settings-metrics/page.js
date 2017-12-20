import React from 'react'
import { MetricsMobilization } from '~client/components/metrics'
import { Title } from '~client/components/title'
import { SettingsPageLayout, SettingsPageContentLayout } from '~client/components/layout'
import { SettingsMenu } from '~client/mobilizations/components'

const MobilizationsSettingsMetricsPage = props => (
  <React.Fragment>
    <Title>Métricas</Title>
    {props.mobilization.id && <MetricsMobilization mobilizationId={props.mobilization.id} />}
  </React.Fragment>
)

export default MobilizationsSettingsMetricsPage
