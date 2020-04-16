import gql from 'graphql-tag'

export default gql`
query ChatbotSettings($chatbotId: Int!) {
  chatbot_settings(where: {chatbot_id: {_eq: $chatbotId}}) {
    id
    channel
    settings
    chatbot_id
    created_at
    updated_at
  }
}
`
