import { gql } from 'react-apollo'

//
// @param Object({ extraFields: Array })
//
export default ({ extraFields = [] }) => gql`
query fetchFacebookActivistsByQuickReplyDateInterval(
  $quickReply: String!
  $dateIntervalStart: Datetime!
  $dateIntervalEnd: Datetime!
  $first: Int
) {
  query: getFacebookActivistsByQuickReplyDateInterval(
    quickReply: $quickReply
    dateIntervalStart: $dateIntervalStart
    dateIntervalEnd: $dateIntervalEnd
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
