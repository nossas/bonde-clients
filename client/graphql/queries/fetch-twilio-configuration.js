import { gql } from 'react-apollo'

export default gql`
  query fetchTwilioConfiguration($communityId: Int!) {
    allTwilioConfigurations(condition: {
      communityId: $communityId
    }) {
      nodes {
        id
        communityId
        twilioAccountSid
        twilioAuthToken
        twilioNumber
        createdAt
        updatedAt
      }
    }
  }
`
