import { gql } from 'react-apollo'

//
// @param Object({ extraFields: Array })
//
export default ({ extraFields = [] }) => gql`
query fetchFacebookActivistsByQuickReply(
  $quickReply: String!
  $first: Int
) {
  query: getFacebookActivistsByQuickReply(
    quickReply: $quickReply
    first: $first
  ) {
    totalCount
    activists: nodes {
      fbContextRecipientId
      ${extraFields.join(' ')}
    }
  }
}
`
