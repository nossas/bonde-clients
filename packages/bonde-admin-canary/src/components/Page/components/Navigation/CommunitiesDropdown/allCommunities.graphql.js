import gql from 'graphql-tag'

export default gql`
query communities {
  allCommunities {
    nodes {
      id,
      name
    }
  }
}
`
