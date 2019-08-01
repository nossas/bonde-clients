import gql from 'graphql-tag'

export default gql`
  query ChatbotCampaigns($chatbotSettingsId: Int!) {
    chatbot_campaigns(where: { chatbot_settings_id: { _eq: $chatbotSettingsId } }) {
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