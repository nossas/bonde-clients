import gql from 'graphql-tag'

export default gql`
fragment CommunitiesDropdownCommunity on Community {
  id
  name
}
`
