import gql from 'graphql-tag'

export default gql`
mutation UpdateChatbotCampaigns($campaign: chatbot_campaigns_set_input!, $id: Int!) {
  update_chatbot_campaigns(
    _set: $campaign,
    where: { id: { _eq: $id } }
  ) {
    returning {
      id
      name
      diagram
      status
      chatbot_id
      created_at
      updated_at
    }
  }
}
`
