import gql from 'graphql-tag'

export default gql`
mutation RequestForgetPassword ($data: JSON!) {
  requestResetPasswordToken (
    input: { data: $data }
  ) {
    clientMutationId
  }
}
`
