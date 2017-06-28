import { graphql } from 'react-apollo'
import MetricsCommunity from './metrics-community'
import MetricsCommunityGraphQL from './metrics-community.graphql'

export default graphql(MetricsCommunityGraphQL)(MetricsCommunity)
