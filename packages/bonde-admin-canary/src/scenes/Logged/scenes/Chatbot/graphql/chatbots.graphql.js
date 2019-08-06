import gql from 'graphql-tag'

export default gql`
query Chatbot($communityId: Int!) {
  chatbots (where: { community_id: { _eq: $communityId }}) {
    id,
    name,
    community_id,
    created_at,
    updated_at
  }
}
`
