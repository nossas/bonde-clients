import gql from 'graphql-tag'

export default gql`
mutation UpdateChatbotCampaigns($name: String!, $prefix: String!, $diagram: jsonb!, $id: Int!, $status: String!) {
  update_chatbot_campaigns(
    _set: {
      name: $name,
      prefix: $prefix,
      diagram: $diagram,
      status: $status,
    },
    where: { id: { _eq: $id } }
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
