import gql from 'graphql-tag'

export default gql`
mutation InsertChatbotCampaigns($name: String!, $prefix: String!, $diagram: jsonb!, $chatbotId: Int!) {
  insert_chatbot_campaigns(
    objects: {
      name: $name,
      prefix: $prefix,
      diagram: $diagram,
      chatbot_id: $chatbotId
    }
  ) {
    returning {
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
}
`