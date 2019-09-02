import gql from 'graphql-tag'

export default gql`
  mutation DeleteChatbotCampaign ($campaignId: Int!) {
    delete_chatbot_campaigns (where: { id: { _eq: $campaignId } }) {
      returning {
        id
      }
    }
  }
`
