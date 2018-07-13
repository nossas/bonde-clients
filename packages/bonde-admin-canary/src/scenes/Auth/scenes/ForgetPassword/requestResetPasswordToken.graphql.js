import gql from 'graphql-tag'

export default gql`
mutation RequestForgetPassword ($email: String!, $locale: String) {
  requestResetPasswordToken (
    input: { email: $email, locale: $locale }
  ) {
    clientMutationId
  }
}
`
