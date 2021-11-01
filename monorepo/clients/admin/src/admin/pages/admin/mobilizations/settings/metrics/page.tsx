
import { MetricsMobilization } from "../../../../../components/metrics"
import { Title } from '../../../../../components/title'

function MobilizationsSettingsMetricsPage(properties) {
  return <>
    <Title>Métricas</Title>
    <MetricsMobilization mobilizationId={properties.mobilization.id} />
  </>
}

export default MobilizationsSettingsMetricsPage
