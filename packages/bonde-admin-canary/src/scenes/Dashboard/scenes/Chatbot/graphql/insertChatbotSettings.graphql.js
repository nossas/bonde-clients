import gql from 'graphql-tag'

export default gql`
mutation InsertChatbotSettings($channel: String!, $settings: jsonb!, $chatbotId: Int!) {
  insert_chatbot_settings(
    objects: {
      channel: $channel,
      settings: $settings,
      chatbot_id: $chatbotId
    }
  ) {
    returning {
      id
      channel
      settings
      chatbot_id
      created_at
      updated_at
    }
  }
}
`
