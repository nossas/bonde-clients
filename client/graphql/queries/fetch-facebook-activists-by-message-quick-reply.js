import { gql } from 'react-apollo'

//
// @param Object({ extraFields: Array })
//
export default ({ extraFields = [] }) => gql`
query fetchFacebookActivistsByMessageQuickReply(
  $message: String!
  $quickReply: String!
  $first: Int
) {
  query: getFacebookActivistsByMessageQuickReply(
    message: $message
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
