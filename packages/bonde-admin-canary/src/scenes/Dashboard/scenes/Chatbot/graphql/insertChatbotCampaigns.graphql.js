import gql from 'graphql-tag'

export default gql`
mutation InsertChatbotCampaigns($campaign: chatbot_campaigns_insert_input!) {
  insert_chatbot_campaigns(objects: [$campaign]) {
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
