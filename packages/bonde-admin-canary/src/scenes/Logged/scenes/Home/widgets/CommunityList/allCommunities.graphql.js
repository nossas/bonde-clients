import gql from 'graphql-tag'

export default gql`
  query allCommunities {
    allCommunities {
      nodes {
        id,
        name,
        description,
        image,
        city
      }
    }
  }
`
