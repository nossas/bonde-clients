import { gql } from 'react-apollo'

//
// @param Object({ extraFields: Array })
//
export default ({ extraFields = [] }) => gql`
query fetchFacebookActivistsByDateInterval(
  $dateIntervalStart: Datetime!
  $dateIntervalEnd: Datetime!
  $first: Int
) {
  query: getFacebookActivistsByDateInterval(
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
