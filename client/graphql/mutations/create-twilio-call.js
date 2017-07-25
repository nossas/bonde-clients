import { gql } from 'react-apollo'

export default gql`
  mutation createTwilioCall(
    $widgetId: Int!
    $from: String!
    $to: String!
  ){
    createTwilioCall(input: {
      call: {
        widgetId: $widgetId
        from: $from
        to: $to
      }
    }) {
      twilioCalls {
        id
        widgetId
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
