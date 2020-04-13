import gql from 'graphql-tag'

export default gql`
mutation UpdateChatbot($persistent_menu: jsonb, $id: Int!) {
  update_chatbots(_set: { persistent_menu: $persistent_menu }, where: { id: { _eq: $id } }) {
    returning {
      id
      name
      community_id
      persistent_menu
      created_at
      updated_at
    }
  }
}
`
