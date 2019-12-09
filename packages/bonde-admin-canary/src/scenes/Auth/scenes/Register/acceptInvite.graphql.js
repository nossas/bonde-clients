import gql from 'graphql-tag'

export default gql`
mutation AcceptInvite ($email: String!, $code: String!){
  accept_invite(email: $email, invitation_code: $code) {
    invitation_code
    email
    is_new_user
  }
}
`
