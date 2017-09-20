import { gql } from 'react-apollo'

//
// @param Object({ extraFields: Array })
//
export default ({ extraFields = [] }) => gql`
query fetchFacebookActivistsByMessageDateInterval(
  $message: String!
  $dateIntervalStart: Datetime!
  $dateIntervalEnd: Datetime!
  $first: Int
) {
  query: getFacebookActivistsByMessageDateInterval(
    message: $message
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
