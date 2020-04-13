import gql from 'graphql-tag'

export default gql`
query ChatbotInfo($id: Int!) {
  chatbots (where: { id: { _eq: $id }}) {
    id
    name
    persistent_menu
    community_id
    created_at
    updated_at
  }
}
`
