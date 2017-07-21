import { gql } from 'react-apollo'

export default gql`
mutation createTwilioCall($from: String!, $to: String!){
  createTwilioCall(input: {
    call: {
      from: $from
      to: $to
    }
  }) {
    twilioCalls {
      id
      activistId
      twilioAccountSid
      twilioCallSid
      from
      to
      data
      createdAt
      updatedAt
    }
  }
}
`
