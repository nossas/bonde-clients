import gql from 'graphql-tag'

export default gql`
  fragment TrendingMobilizationsGadgetFragment on Mobilization {
    id
    name
    goal
    facebookShareImage
    community {
      name
    }
  }
`
