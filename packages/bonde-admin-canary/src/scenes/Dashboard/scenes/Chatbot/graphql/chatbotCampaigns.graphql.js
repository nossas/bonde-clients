import gql from 'graphql-tag'

export default gql`
  query ChatbotCampaigns($chatbotId: Int!, $filter: [String!]) {
    chatbot_campaigns(
      where: { chatbot_id: { _eq: $chatbotId }, status: { _in: $filter } },
      order_by: { created_at: desc }
    ) {
      id
      name
      diagram
      status
      chatbot_id
      created_at
      updated_at
    }
  }
`
