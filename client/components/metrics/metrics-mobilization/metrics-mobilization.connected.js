import { graphql } from 'react-apollo'
import MetricsMobilization from './metrics-mobilization'
import MetricsMobilizationGraphQL from './metrics-mobilization.graphql'

export default graphql(MetricsMobilizationGraphQL)(MetricsMobilization)
