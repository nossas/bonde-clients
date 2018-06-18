import gql from 'graphql-tag'

export default gql`
query HomePage {

  allCommunities (first: 5) {
    nodes {
      id
      name
      image
      description
      city
      updatedAt
    }
  }

  trendingMobilizations (first: 4, days: 2) {
    nodes {
      id
      name
      goal
      facebookShareImage
      community {
        name
      }
    }
  }
}
`
