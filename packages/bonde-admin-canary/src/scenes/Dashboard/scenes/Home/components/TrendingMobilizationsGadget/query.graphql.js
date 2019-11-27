import gql from 'graphql-tag'

/*
export default gql`
  query TrendingMobilizations($limit: Int) {
    trendingMobilizations(first: $limit) {
      nodes {
        id
        name
        goal
        facebookShareImage
        customDomain
        slug
        community {
          name
        }
      }
    }
  }
`
*/

export default gql`
  query TrendingMobilizations($created_at: timestamp!) {
    anonymous_mobilizations (
      limit: 4,
      offset: 0,
      order_by: {
        activist_actions_aggregate: {
          count: desc_nulls_last
        }
      }
    ) {
      id
      name
      goal
      facebook_share_image
      custom_domain
      slug
      community {
        name
      }
      activist_actions_aggregate(where: {action_created_at: {_gte: $created_at}}) {
        aggregate {
          count
        }
      }
    }
  }
`
