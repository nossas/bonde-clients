import gql from 'graphql-tag'

export default gql`
mutation InsertChatbot($name: String!, $communityId: Int!) {
  insert_chatbots(objects: {name: $name, community_id: $communityId}) {
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