import gql from 'graphql-tag'

export default gql`
mutation InsertChatbotCampaigns(
  $name: String!,
  $prefix: String!,
  $status: String!,
  $diagram: jsonb,
  $chatbotId: Int!
) {
  insert_chatbot_campaigns(
    objects: {
      name: $name,
      prefix: $prefix,
      diagram: $diagram,
      status: $status,
      chatbot_id: $chatbotId
    }
  ) {
    returning {
      id
      name
      prefix
      diagram
      status
      chatbot_id
      created_at
      updated_at
    }
  }
}
`
