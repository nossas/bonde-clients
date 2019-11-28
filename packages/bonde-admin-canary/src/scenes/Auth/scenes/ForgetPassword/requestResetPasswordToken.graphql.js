import gql from 'graphql-tag'

export default gql`
mutation RequestForgetPassword ($email: String!, $callbackUrl: String!, $locale: String) {
  reset_password_request (email: $email, callback_url: $callbackUrl, locale: $locale)
}
`
