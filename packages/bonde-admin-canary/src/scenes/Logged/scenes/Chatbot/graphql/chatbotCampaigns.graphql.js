import gql from 'graphql-tag'

export default gql`
  query ChatbotCampaigns($chatbotId: Int!) {
    chatbot_campaigns(where: { chatbot_id: { _eq: $chatbotId } }) {
      id
      name
      prefix
      diagram
      draft
      chatbot_id
      created_at
      updated_at
    }
  }
`