import gql from 'graphql-tag'
import TrendingMobilizationsGadgetFragment from './fragment.graphql'

export default gql`
  query TrendingMobilizations($first: Int!, $days: Int!) {
    trendingMobilizations(first: $first, days: $days) {
      nodes {
        ...TrendingMobilizationsGadgetFragment
      }
    }
  }
${TrendingMobilizationsGadgetFragment}
`
