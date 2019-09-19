import gql from 'graphql-tag'

export default gql`
mutation ResetPassword (
  $password: String!,
  $token: String!
) {
  resetPasswordChangePassword (input: {
    newPassword:$password,
    token:$token
  }) {
    changePasswordField {
      userFirstName,
      token
    }
  }
}`
