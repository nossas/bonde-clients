import gql from 'graphql-tag'

export default gql`
mutation register ($user: RegisterInput!) {
  register (input: $user) {
    jwtToken
  }
}`
