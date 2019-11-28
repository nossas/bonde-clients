import gql from 'graphql-tag'

export default gql`
query TokenVerify ($token: String!) {
  reset_password_verify(token: $token) {
    id
  }
}
`
