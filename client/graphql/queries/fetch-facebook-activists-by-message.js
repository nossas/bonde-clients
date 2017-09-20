import { gql } from 'react-apollo'

//
// @param Object({ extraFields: Array })
//
export default ({ extraFields = [] }) => gql`
query fetchFacebookActivistsByMessage(
  $message: String!
  $first: Int
) {
  query: getFacebookActivistsByMessage(
    message: $message
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
