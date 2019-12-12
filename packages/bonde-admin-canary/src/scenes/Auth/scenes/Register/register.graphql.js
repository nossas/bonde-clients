import gql from 'graphql-tag'

export default gql`
  mutation Register ($input: RegisterInput!) {
    register(input: $input) {
      first_name
      token
    }
  }
`
