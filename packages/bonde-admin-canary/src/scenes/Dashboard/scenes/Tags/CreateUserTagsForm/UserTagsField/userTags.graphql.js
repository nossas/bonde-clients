import gql from 'graphql-tag'

export default gql`
  query UserTags {
    tags (where: { kind: { _eq: "user" } }) {
      id
      name
      label
      kind
    }
  }
`
