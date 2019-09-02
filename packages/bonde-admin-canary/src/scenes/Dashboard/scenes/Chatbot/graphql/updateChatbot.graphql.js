import gql from 'graphql-tag'

export default gql`
mutation UpdateChatbot($name: String!, $id: Int!) {
  update_chatbots(_set: { name: $name }, where: { id: { _eq: $id } }) {
    returning {
      id,
      name,
      community_id,
      created_at,
      updated_at
    }
  }
}
`
