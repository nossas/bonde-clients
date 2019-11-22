import gql from 'graphql-tag'

export default gql`
mutation ResetPassword (
  $password: String!,
  $token: String!
) {
  reset_password_change (password: $password, token:$token) {
    first_name,
    token
  }
}`
