import gql from 'graphql-tag'

export default gql`
mutation UpdateChatbotSettings($settings: jsonb!, $id: Int!) {
  update_chatbot_campaigns(
    _set: {
      settings: $settings,
    },
    where: { id: { _eq: $id } }
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
